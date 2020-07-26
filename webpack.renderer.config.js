const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

// @note: This is to enable access to global variable for some imports.
rules.push({
  test: /\.js$/,
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
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
