import { Button, Heading, Box, Grid } from '@chakra-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';

import LifxService, { LifxLight } from '../services/LifxService';

const service = new LifxService();

interface LifxProps {
  path: string;
}

const Lifx: React.FC<LifxProps> = () => {
  const [lights, setLights] = useState<LifxLight[]>([]);
  const [selectedId, setSelectedId] = useLocalStorage('lifx-light-id', '');

  useEffect(() => {
    doAsync();

    async function doAsync(): Promise<void> {
      const lights = await service.getLights();

      setLights(
        lights.sort((a, b) => {
          const aName = getLightName(a);
          const bName = getLightName(b);

          if (aName > bName) {
            return 1;
          }

          if (bName > aName) {
            return -1;
          }

          return 0;
        }),
      );
    }
  }, []);

  return (
    <div>
      <Heading size="md" mb={4}>
        LIFX
      </Heading>

      <Grid alignItems="center" gap={2} gridTemplateColumns="max-content min-content min-content">
        {lights.map((light) => {
          const name = getLightName(light);

          return (
            <Fragment key={light.id}>
              <Box>{name}</Box>

              <Button
                onClick={async (): Promise<void> => {
                  const lights = await service.getLights();

                  const currentLight = lights.find((l) => l.id === light.id);

                  const currentState = {
                    brightness: currentLight.brightness,
                    color: `hue:${currentLight.color.hue} saturation:${currentLight.color.saturation} kelvin:${currentLight.color.kelvin}`,
                    power: currentLight.power,
                  };

                  await service.setLightState(`id:${light.id}`, {
                    brightness: 1.0,
                    color: '#ff0000',
                    duration: 1.0,
                    power: 'on',
                  });

                  setTimeout(async () => {
                    await service.setLightState(`id:${light.id}`, {
                      ...currentState,
                      duration: 1.0,
                    });
                  }, 2000);
                }}
              >
                Test
              </Button>

              <Button
                isDisabled={selectedId === light.id}
                onClick={(event): void => {
                  event.preventDefault();
                  setSelectedId(light.id);
                }}
              >
                Select
              </Button>
            </Fragment>
          );
        })}
      </Grid>
    </div>
  );
};

export default Lifx;

function getLightName(light: LifxLight): string {
  const name = `${light.label.trim()} (${light.group?.name.trim()})`;
  return name;
}
