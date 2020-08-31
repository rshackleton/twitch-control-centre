import { Button, FormLabel, Grid, GridColumn, Input, Text } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

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

      <GridColumn gridColumn="span 2">
        <Button type="submit">Save</Button>
      </GridColumn>
    </Grid>
  );
};

export default ActionForm;
