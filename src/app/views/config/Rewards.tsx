import { Button, Grid, GridColumn, Text, VStack } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import React, { Fragment, useState } from 'react';

import { useAppConfig } from '@components/AppConfigProvider';
import RewardForm from '@components/RewardForm';
import { RewardFormData } from '@components/RewardForm/RewardForm.types';

interface RewardsViewProps extends RouteComponentProps {}

const RewardsView: React.FC<RewardsViewProps> = () => {
  const appConfig = useAppConfig();

  const rewards = appConfig?.getKey('rewards') ?? {};

  const [editedItem, setEditedItem] = useState<Partial<RewardFormData> | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <VStack>
      {showForm ? (
        <RewardForm
          initialData={editedItem}
          onBack={(): void => {
            setShowForm(false);
          }}
          onSubmit={(data): void => {
            appConfig?.setKey('rewards', {
              ...rewards,
              [data.id]: data.name,
            });

            setShowForm(false);
          }}
        />
      ) : (
        <Grid alignItems="center" gap={4}>
          {Object.entries(rewards).map(([id, name]) => (
            <Fragment key={id}>
              <GridColumn>
                <Text>{name}</Text>
              </GridColumn>
              <GridColumn>
                <Text>{id}</Text>
              </GridColumn>
              <GridColumn>
                <Button
                  mr={2}
                  onClick={(): void => {
                    setEditedItem({ id, name });
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(): void => {
                    const newRewards = {
                      ...rewards,
                    };

                    delete newRewards[id];

                    appConfig?.setKey('rewards', newRewards);
                  }}
                >
                  Delete
                </Button>
              </GridColumn>
            </Fragment>
          ))}
          <GridColumn gridColumn="span 3">
            <Button
              type="button"
              onClick={(): void => {
                setShowForm(true);
              }}
            >
              Add
            </Button>
          </GridColumn>
        </Grid>
      )}
    </VStack>
  );
};

export default RewardsView;
