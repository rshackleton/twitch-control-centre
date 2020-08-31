import { Button, FormLabel, Grid, GridColumn, Input, Text } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

import { RewardFormProps, RewardFormData } from './RewardForm.types';

const RewardForm: React.FC<RewardFormProps> = ({ initialData, onSubmit }) => {
  const { errors, handleSubmit, register } = useForm<RewardFormData>({
    defaultValues: initialData ?? {},
  });

  return (
    <Grid as="form" gap={4} noValidate templateColumns="1fr 1fr" onSubmit={handleSubmit(onSubmit)}>
      <GridColumn>
        <FormLabel htmlFor="name">Reward Name</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({ required: { message: 'Please enter reward name.', value: true } })}
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
        <FormLabel htmlFor="id">Reward ID</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          ref={register({ required: { message: 'Please enter reward ID.', value: true } })}
          id="id"
          name="id"
        />
      </GridColumn>
      {errors.id && (
        <GridColumn gridColumn="span 2">
          {errors.id && <Text color="tomato">{errors.id.message}</Text>}
        </GridColumn>
      )}

      <GridColumn gridColumn="span 2">
        <Button type="submit">Save</Button>
      </GridColumn>
    </Grid>
  );
};

export default RewardForm;
