import { Button, FormLabel, Grid, GridColumn, HStack, Input, Text, Select } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';

import RewardSelector from '@components/RewardSelector';
import ActionForms from '@components/ActionForms';
import { AppActionFormData, AppActionType, AppTriggerType } from '@src/types';

import { ActionFormProps } from './ActionForm.types';

const ActionForm: React.FC<ActionFormProps> = ({ initialData, onBack, onSubmit }) => {
  const { errors, handleSubmit, register, setValue, watch } = useForm<AppActionFormData>({
    defaultValues: initialData ?? {},
  });

  const rewardType = watch(
    'actionType',
    initialData?.actionType ?? AppActionType.LIFX,
  ) as AppActionType;

  const ActionFormComponent = ActionForms[rewardType];

  return (
    <Grid as="form" gap={4} noValidate templateColumns="1fr 1fr" onSubmit={handleSubmit(onSubmit)}>
      <input ref={register({ required: true })} id="id" name="id" type="hidden" />

      {/* ACTION NAME */}
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

      {/* TRIGGER TYPE */}
      <GridColumn>
        <FormLabel htmlFor="triggerType">Trigger Type</FormLabel>
      </GridColumn>
      <GridColumn>
        <Select
          ref={register({ required: { message: 'Please select a trigger type.', value: true } })}
          id="triggerType"
          name="triggerType"
        >
          {Object.values(AppTriggerType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </GridColumn>
      {errors.triggerType && (
        <GridColumn gridColumn="span 2">
          {errors.triggerType && <Text color="tomato">{errors.triggerType.message}</Text>}
        </GridColumn>
      )}

      {/* TRIGGER DATA */}
      <GridColumn>
        <FormLabel htmlFor="triggerData.rewardId">Reward</FormLabel>
      </GridColumn>
      <GridColumn>
        <RewardSelector
          ref={register({ required: { message: 'Please select a reward.', value: true } })}
          id="triggerData.rewardId"
          name="triggerData.rewardId"
        />
      </GridColumn>
      {errors.triggerData?.rewardId && (
        <GridColumn gridColumn="span 2">
          {errors.triggerData?.rewardId && (
            <Text color="tomato">{errors.triggerData?.rewardId.message}</Text>
          )}
        </GridColumn>
      )}

      {/* ACTION TYPE */}
      <GridColumn>
        <FormLabel htmlFor="actionType">Action Type</FormLabel>
      </GridColumn>
      <GridColumn>
        <Select
          ref={register({ required: { message: 'Please select a trigger type.', value: true } })}
          id="actionType"
          name="actionType"
        >
          {Object.values(AppActionType).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </Select>
      </GridColumn>
      {errors.actionType && (
        <GridColumn gridColumn="span 2">
          {errors.actionType && <Text color="tomato">{errors.actionType.message}</Text>}
        </GridColumn>
      )}

      {/* ACTION DATA */}
      {ActionFormComponent && (
        <ActionFormComponent errors={errors} register={register} setValue={setValue} />
      )}

      {/* SUBMIT */}
      <GridColumn gridColumn="span 2">
        <HStack>
          <Button type="submit">Save</Button>
          <Button
            type="button"
            onClick={(event): void => {
              event.preventDefault();
              onBack();
            }}
          >
            Back
          </Button>
        </HStack>
      </GridColumn>
    </Grid>
  );
};

export default ActionForm;
