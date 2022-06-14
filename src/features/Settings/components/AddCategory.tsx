import React from 'react';
import { nanoid } from 'nanoid';
import { Button, Container, Space, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useLiveQuery } from 'dexie-react-hooks';

import { AddCategoryFormData } from '../types';
import { Category } from '@/database/models/Category';

export default function AddCategory() {
  const { control, handleSubmit, reset } = useForm<AddCategoryFormData>();
  const list = useLiveQuery(() => Category.getAll());
  const listOfCategoryNames: string[] = list ? list?.map((item) => item.name.toLowerCase()) : [];

  const isNameUnique = (name: string) => !listOfCategoryNames.includes(name.toLowerCase());

  const addCategory = (data: AddCategoryFormData) => {
    Category.add({
      id: nanoid(),
      name: data.name,
      dateCreated: new Date().toUTCString(),
    });
    reset({ name: '' });
  };

  return (
    <Container size={360} sx={{ width: '100%' }} p={0} m={0}>
      <Controller
        name="name"
        control={control}
        rules={{
          required: 'This field is required',
          validate: (name) => isNameUnique(name) || 'Name already exists.',
          minLength: {
            value: 2,
            message: 'Name should least have 2 characters.',
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextInput
            placeholder="Enter category name"
            label="Category name"
            description="Categories are additional information to classify the items you add to your list."
            maxLength={30}
            value={value}
            onChange={onChange}
            error={error?.message}
            required
          />
        )}
      />
      <Space h="md" />
      <Button onClick={handleSubmit(addCategory)}>Add</Button>
    </Container>
  );
}
