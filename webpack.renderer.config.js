const path = require('path');

const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

// @note: This is to enable access to global variable for some imports.
rules.push({
  test: /\.js$/,
  exclude: /electron/,
  include: /node_modules/,
  use: [
    {
      loader: 'imports-loader',
      options: {
        additionalCode: 'var global = window;',
      },
    },
  ],
});

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),

      '@components': path.resolve(__dirname, 'src/app/components'),
      '@config': path.resolve(__dirname, 'src/app/config'),
      '@redux': path.resolve(__dirname, 'src/app/redux'),
      '@services': path.resolve(__dirname, 'src/app/services'),
      '@views': path.resolve(__dirname, 'src/app/views'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
