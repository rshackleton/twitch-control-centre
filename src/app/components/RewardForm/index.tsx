import React, { useState } from 'react';
import { FormLabel, Grid, GridColumn, Input } from '@chakra-ui/core';

import { RewardFormProps } from './RewardForm.types';

const RewardForm: React.FC<RewardFormProps> = ({ onSubmit }) => {
  const [rewardId, setRewardId] = useState('');

  return (
    <Grid
      as="form"
      templateColumns="1fr 1fr"
      onSubmit={(): void => {
        onSubmit({ rewardId });
      }}
    >
      <GridColumn>
        <FormLabel htmlFor="rewardId">Reward ID</FormLabel>
      </GridColumn>
      <GridColumn>
        <Input
          id="rewardId"
          name="rewardId"
          value={rewardId}
          onChange={(event): void => setRewardId(event.target.value)}
        />
      </GridColumn>
    </Grid>
  );
};

export default RewardForm;
