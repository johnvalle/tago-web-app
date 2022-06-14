import React from 'react';
import { Stack, Title } from '@mantine/core';
import CategoryList from './CategoryList';
import AddCategory from './AddCategory';

export default function Categories() {
  return (
    <Stack justify="start">
      <Title order={5}>Categories</Title>
      <CategoryList />
      <AddCategory />
    </Stack>
  );
}
