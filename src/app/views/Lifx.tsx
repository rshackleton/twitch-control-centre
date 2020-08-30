import { Box, Button, Grid, Heading } from '@chakra-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppConfig } from '@components/AppConfigProvider';
import { Lifx } from '@src/types';
import * as actions from '@redux/actions';
import { RootState } from '@redux/reducers';
import { getLightName } from '@redux/reducers/lifxReducer';
import { useAppDispatch } from '@redux/store';

interface LifxProps {
  path: string;
}

const Lifx: React.FC<LifxProps> = () => {
  const appConfigContext = useAppConfig();

  const selectedLightId = appConfigContext?.getKey('selectedLightId') ?? '';

  const lights = useSelector<RootState, Lifx.Light[]>((state) => state.lifx.lights);

  const dispatch = useAppDispatch();

  useEffect(() => {
    doAsync();

    async function doAsync(): Promise<void> {
      await dispatch(actions.lifx.getLights());
    }
  }, []);

  return (
    <Box>
      <Heading size="md" mb={4}>
        LIFX
      </Heading>

      <Grid alignItems="center" gap={2} gridTemplateColumns="max-content min-content min-content">
        {lights.map((light: Lifx.Light) => {
          const name = getLightName(light);

          return (
            <Fragment key={light.id}>
              <Box>{name}</Box>

              <Button
                onClick={async (): Promise<void> => {
                  // Refresh lights data.
                  const results = await dispatch(actions.lifx.getLights());

                  // Use directly returned data now.
                  const lights = unwrapResult(results);

                  const currentLight = lights.find((l) => l.id === light.id);

                  if (!currentLight) {
                    return;
                  }

                  const currentState = {
                    brightness: currentLight.brightness,
                    color: `hue:${currentLight.color.hue} saturation:${currentLight.color.saturation} kelvin:${currentLight.color.kelvin}`,
                    power: currentLight.power,
                  };

                  await dispatch(
                    actions.lifx.setLightState({
                      selector: `id:${light.id}`,
                      lightState: {
                        brightness: 1.0,
                        color: '#ff0000',
                        duration: 1.0,
                        power: 'on',
                      },
                    }),
                  );

                  setTimeout(async () => {
                    await dispatch(
                      actions.lifx.setLightState({
                        selector: `id:${light.id}`,
                        lightState: {
                          ...currentState,
                          duration: 1.0,
                        },
                      }),
                    );
                  }, 2000);
                }}
              >
                Test
              </Button>

              <Button
                isDisabled={selectedLightId === light.id}
                onClick={async (event): Promise<void> => {
                  event.preventDefault();

                  appConfigContext?.setKey('selectedLightId', light.id);
                }}
              >
                Select
              </Button>
            </Fragment>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Lifx;
