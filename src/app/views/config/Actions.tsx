import { Button, Grid, GridColumn, Text, VStack } from '@chakra-ui/core';
import { RouteComponentProps } from '@reach/router';
import { nanoid } from '@reduxjs/toolkit';
import React, { Fragment, useState } from 'react';

import ActionForm from '@components/ActionForm';
import { ActionFormData } from '@components/ActionForm/ActionForm.types';
import { useAppConfig } from '@components/AppConfigProvider';
import { AppActionType, AppTriggerType } from '@src/types';

interface ActionsViewProps extends RouteComponentProps {}

const ActionsView: React.FC<ActionsViewProps> = () => {
  const appConfig = useAppConfig();

  const actions = appConfig?.getKey('actions') ?? {};

  const [editedItem, setEditedItem] = useState<Partial<ActionFormData> | null>(null);
  const [showForm, setShowForm] = useState(false);

  return (
    <VStack>
      {showForm ? (
        <ActionForm
          initialData={editedItem}
          onBack={(): void => {
            setShowForm(false);
          }}
          onSubmit={(data): void => {
            const newAction = {
              name: data.name,
              actionData: {
                lightId: data.light,
                lightState: JSON.parse(data.lightState),
              },
              actionType: AppActionType.LIFX,
              triggerData: {
                rewardId: data.reward,
              },
              triggerType: AppTriggerType.REWARD,
            };

            appConfig?.setKey('actions', {
              ...actions,
              [data.id]: newAction,
            });

            setShowForm(false);
          }}
        />
      ) : (
        <Grid alignItems="center" gap={4}>
          {Object.entries(actions).map(([id, action]) => (
            <Fragment key={id}>
              <GridColumn>
                <Text>{action.name}</Text>
              </GridColumn>
              <GridColumn>
                <Button
                  mr={2}
                  onClick={(): void => {
                    setEditedItem({
                      id,
                      light: action.actionData.lightId as string,
                      lightState: JSON.stringify(action.actionData.lightState, null, 2),
                      name: action.name,
                      reward: action.triggerData.rewardId as string,
                    });

                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={(): void => {
                    const newActions = {
                      ...actions,
                    };

                    delete newActions[id];

                    appConfig?.setKey('actions', newActions);
                  }}
                >
                  Delete
                </Button>
              </GridColumn>
            </Fragment>
          ))}
          <GridColumn gridColumn="span 2">
            <Button
              type="button"
              onClick={(): void => {
                setEditedItem({ id: nanoid() });
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

export default ActionsView;
