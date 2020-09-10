import { FormLabel, GridColumn, Input, Select, Text } from '@chakra-ui/core';
import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import LightSelector from '@components/LifxLightSelector';
import { AppActionFormData } from '@src/types';
import { RegisterFunction, SetValueFunction } from '@src/types/forms';

interface LifxActionFormProps {
  errors: DeepMap<AppActionFormData, FieldError>;
  register: RegisterFunction;
  setValue: SetValueFunction;
}

const LifxActionForm: React.FC<LifxActionFormProps> = ({ errors, register }) => {
  return (
    <>
      <GridColumn>
        <FormLabel htmlFor="actionData.lightId">Light</FormLabel>
      </GridColumn>
      <GridColumn>
        <LightSelector
          ref={register({ required: { message: 'Please select a light.', value: true } })}
          id="actionData.lightId"
          name="actionData.lightId"
        />
      </GridColumn>
      {errors.actionData?.lightId && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.lightId && (
            <Text color="tomato">{errors.actionData?.lightId.message}</Text>
          )}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="actionData.brightness">Brightness</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({
            required: { message: 'Please enter the light brightness.', value: true },
          })}
          id="actionData.brightness"
          name="actionData.brightness"
          type="number"
        />
      </GridColumn>
      {errors.actionData?.brightness && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.brightness && (
            <Text color="tomato">{errors.actionData?.brightness.message}</Text>
          )}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="actionData.color">Color</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({ required: { message: 'Please enter the light color.', value: true } })}
          id="actionData.color"
          name="actionData.color"
        />
      </GridColumn>
      {errors.actionData?.color && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.color && (
            <Text color="tomato">{errors.actionData?.color.message}</Text>
          )}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="actionData.duration">Duration</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({
            required: { message: 'Please enter the transition duration.', value: true },
          })}
          id="actionData.duration"
          name="actionData.duration"
          type="number"
        />
      </GridColumn>
      {errors.actionData?.duration && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.duration && (
            <Text color="tomato">{errors.actionData?.duration.message}</Text>
          )}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="actionData.power">Power State</FormLabel>
      </GridColumn>
      <GridColumn>
        <Select
          ref={register({ required: { message: 'Please select the power state.', value: true } })}
          id="actionData.power"
          name="actionData.power"
        >
          <option value="on">On</option>
          <option value="off">Off</option>
        </Select>
      </GridColumn>
      {errors.actionData?.power && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.power && (
            <Text color="tomato">{errors.actionData?.power.message}</Text>
          )}
        </GridColumn>
      )}
    </>
  );
};

export default LifxActionForm;
