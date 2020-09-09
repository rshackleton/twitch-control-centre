import { Select } from '@chakra-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import * as actions from '@redux/actions';
import { getLightName } from '@redux/reducers/lifxReducer';
import { RootState } from '@redux/reducers';
import { useAppDispatch } from '@redux/store';
import { Light } from '@src/types';

import { LightSelectorProps } from './LifxLightSelector.types';

const LightSelector = React.forwardRef<HTMLSelectElement, LightSelectorProps>(
  ({ placeholder = '(select light)', ...otherProps }, ref) => {
    const lights = useSelector<RootState, Light[]>((state) => state.lifx.lights);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(actions.lifx.getLights());
    }, []);

    return (
      <Select ref={ref} {...otherProps}>
        <option>{placeholder}</option>
        {lights.map((light) => (
          <option key={light.id} value={light.id}>
            {getLightName(light)}
          </option>
        ))}
      </Select>
    );
  },
);

LightSelector.displayName = 'LightSelector';

export default LightSelector;
