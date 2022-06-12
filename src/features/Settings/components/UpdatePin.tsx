import React from 'react';

import { useLocalStorage } from '@mantine/hooks';
import { Button, Container, PasswordInput, Space, Stack, Title } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

import { UpdatePinFormData } from '../types';
import { TAGO_PIN } from '@/constants/vars';

export function UpdatePin() {
  const [pin, setPin] = useLocalStorage({ key: TAGO_PIN, defaultValue: '' });
  const { handleSubmit, control } = useForm<UpdatePinFormData>({
    defaultValues: { pin },
  });

  const updatePin = (data: UpdatePinFormData) => setPin(data.pin);

  return (
    <Container size={360} sx={{ width: '100%' }} p={0} m={0}>
      <Stack justify="start">
        <Title order={5}>Pin settings</Title>
        <Controller
          name="pin"
          control={control}
          rules={{
            required: 'This field is required',
            minLength: {
              value: 4,
              message: 'Pin should least have 4 characters.',
            },
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <PasswordInput
              placeholder="Enter pin"
              label="Encryption pin"
              maxLength={8}
              description="The encryption pin is used to encrypt or hide the items you add your list."
              value={value}
              onChange={onChange}
              error={error?.message}
              required
            />
          )}
        />
      </Stack>
      <Space h="md" />
      <Button onClick={handleSubmit(updatePin)}>Update</Button>
    </Container>
  );
}
