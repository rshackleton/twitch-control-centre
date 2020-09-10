import {
  FormLabel,
  GridColumn,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/core';
import { AttachmentIcon } from '@chakra-ui/icons';
import { ipcRenderer } from 'electron';
import React from 'react';
import { DeepMap, FieldError } from 'react-hook-form';

import { IpcChannels } from '@src/enums/IpcChannels';
import { AppActionFormData } from '@src/types';
import { RegisterFunction, SetValueFunction } from '@src/types/forms';

interface SfxActionFormProps {
  errors: DeepMap<AppActionFormData, FieldError>;
  register: RegisterFunction;
  setValue: SetValueFunction;
}

const SfxActionForm: React.FC<SfxActionFormProps> = ({ errors, register, setValue }) => {
  return (
    <>
      <GridColumn>
        <FormLabel htmlFor="actionData.audioFile">Light State</FormLabel>
      </GridColumn>
      <GridColumn>
        <InputGroup>
          <Input
            ref={register({ required: { message: 'Please upload an audio file.', value: true } })}
            id="actionData.audioFile"
            name="actionData.audioFile"
            readOnly
          />
          <InputRightAddon p={0}>
            <IconButton
              aria-label="Select file"
              icon={<AttachmentIcon />}
              onClick={async (event): Promise<void> => {
                event.preventDefault();

                const value = (await ipcRenderer.invoke(IpcChannels.OPEN_DIALOG, {
                  filters: [
                    { name: 'Audio', extensions: ['mp3', 'wav'] },
                    { name: 'All Files', extensions: ['*'] },
                  ],
                })) as Electron.OpenDialogReturnValue;

                setValue('actionData.audioFile', value.filePaths[0]);
              }}
            />
          </InputRightAddon>
        </InputGroup>
      </GridColumn>
      {errors.actionData?.audioFile && (
        <GridColumn gridColumn="span 2">
          {errors.actionData?.audioFile && (
            <Text color="tomato">{errors.actionData?.audioFile.message}</Text>
          )}
        </GridColumn>
      )}
    </>
  );
};

export default SfxActionForm;
