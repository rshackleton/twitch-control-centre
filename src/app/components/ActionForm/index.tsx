import { Button, FormLabel, Grid, GridColumn, Input, Text, Textarea } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

import LightSelector from '@components/LifxLightSelector';
import RewardSelector from '@components/RewardSelector';

import { ActionFormProps, ActionFormData } from './ActionForm.types';

const ActionForm: React.FC<ActionFormProps> = ({ initialData, onSubmit }) => {
  const { errors, handleSubmit, register } = useForm<ActionFormData>({
    defaultValues: initialData ?? {},
  });

  return (
    <Grid as="form" gap={4} noValidate templateColumns="1fr 1fr" onSubmit={handleSubmit(onSubmit)}>
      <input ref={register({ required: true })} id="id" name="id" type="hidden" />

      <GridColumn>
        <FormLabel htmlFor="name">Action Name</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({ required: { message: 'Please enter action name.', value: true } })}
          id="name"
          name="name"
        />
      </GridColumn>
      {errors.name && (
        <GridColumn gridColumn="span 2">
          {errors.name && <Text color="tomato">{errors.name.message}</Text>}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="name">Reward</FormLabel>
      </GridColumn>
      <GridColumn>
        <RewardSelector
          ref={register({ required: { message: 'Please select a reward trigger.', value: true } })}
          id="reward"
          name="reward"
        />
      </GridColumn>
      {errors.reward && (
        <GridColumn gridColumn="span 2">
          {errors.reward && <Text color="tomato">{errors.reward.message}</Text>}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="name">Light</FormLabel>
      </GridColumn>
      <GridColumn>
        <LightSelector
          ref={register({ required: { message: 'Please select a light.', value: true } })}
          id="light"
          name="light"
        />
      </GridColumn>
      {errors.light && (
        <GridColumn gridColumn="span 2">
          {errors.light && <Text color="tomato">{errors.light.message}</Text>}
        </GridColumn>
      )}

      <GridColumn>
        <FormLabel htmlFor="name">Light State</FormLabel>
      </GridColumn>
      <GridColumn>
        <Textarea
          ref={register({ required: { message: 'Please enter the light state.', value: true } })}
          id="lightState"
          name="lightState"
        />
      </GridColumn>
      {errors.lightState && (
        <GridColumn gridColumn="span 2">
          {errors.lightState && <Text color="tomato">{errors.lightState.message}</Text>}
        </GridColumn>
      )}

      <GridColumn gridColumn="span 2">
        <Button type="submit">Save</Button>
      </GridColumn>
    </Grid>
  );
};

export default ActionForm;
