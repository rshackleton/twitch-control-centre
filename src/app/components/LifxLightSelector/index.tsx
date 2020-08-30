import { Select } from '@chakra-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { getLightName } from '@redux/reducers/lifxReducer';
import { RootState } from '@redux/reducers';
import { Lifx } from '@src/types';

import { LightSelectorProps } from './LifxLightSelector.types';

const LightSelector: React.FC<LightSelectorProps> = ({
  placeholder = '(select light)',
  value,
  onChange,
  ...otherProps
}) => {
  const lights = useSelector<RootState, Lifx.Light[]>((state) => state.lifx.lights);

  return (
    <Select value={value} onChange={onChange} {...otherProps}>
      <option>{placeholder}</option>
      {lights.map((light) => (
        <option key={light.id} value={light.id}>
          {getLightName(light)}
        </option>
      ))}
    </Select>
  );
};

export default LightSelector;
