import React from 'react';
import {
  Chip,
  Chips,
  Divider,
  InputWrapper,
  PasswordInput,
  Stack,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { Controller, useFormContext } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import { SecuredItemFormData } from '../types';
import { Category } from '@/database/models/Category';

export default function ItemForm() {
  const { control, watch } = useFormContext<SecuredItemFormData>();
  const isEncrypted = watch('isEncrypted');

  const categoryList = useLiveQuery(() => Category.getAll());
  return (
    <>
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'This field is required.',
          minLength: {
            value: 2,
            message: 'Enter at least two characters.',
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            value={value}
            onChange={onChange}
            error={error?.message}
            placeholder="Enter item name"
            label="Item Name"
            required
          />
        )}
      />
      <Controller
        name="encryptedValue"
        control={control}
        rules={{ required: 'This field is required.' }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <PasswordInput
            value={value}
            onChange={onChange}
            error={error?.message}
            placeholder="Enter item value to secure"
            label="Item Value"
            required
          />
        )}
      />
      {categoryList && (
        <Controller
          name="category"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputWrapper label="Item category">
              <Chips value={value} onChange={onChange}>
                {categoryList?.map((item) => (
                  <Chip value={item.name}>{item.name}</Chip>
                ))}
              </Chips>
            </InputWrapper>
          )}
        />
      )}
      <Divider variant="dashed" />
      <Controller
        name="isEncrypted"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Stack>
            <Text size="xs" color={isEncrypted ? 'dimmed' : 'red'}>
              {isEncrypted
                ? 'We recommend that item values are encrypted to hide sensitive information.'
                : 'Storing sensitive information as raw text and readable in plain sight.'}
            </Text>
            <Switch
              label="Encrypt with pin"
              checked={Boolean(Number(value))}
              value={Number(value)}
              onChange={(e) => onChange(Boolean(Number(e.target.checked)))}
              defaultChecked
            />
          </Stack>
        )}
      />
    </>
  );
}
