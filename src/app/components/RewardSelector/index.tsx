import { Select } from '@chakra-ui/core';
import React from 'react';

import { useAppConfig } from '@components/AppConfigProvider';

import { RewardSelectorProps } from './RewardSelector.types';

const RewardSelector = React.forwardRef<HTMLSelectElement, RewardSelectorProps>(
  ({ placeholder = '(select reward)', ...otherProps }, ref) => {
    const appConfig = useAppConfig();

    const rewards = appConfig?.getKey('rewards') ?? {};

    return (
      <Select ref={ref} {...otherProps}>
        <option>{placeholder}</option>
        {Object.entries(rewards).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
    );
  },
);

RewardSelector.displayName = 'RewardSelector';

export default RewardSelector;
