import React from 'react';

import { Divider } from '@mantine/core';

import { ContentLayout, MainLayout } from '@/components/Layout';

import { UpdatePin } from '../components/UpdatePin';
import Categories from '../components/Categories';

export function Settings() {
  return (
    <MainLayout>
      <ContentLayout header={{ title: 'Settings' }}>
        <Divider variant="dashed" />
        <UpdatePin />
        <Divider variant="dashed" />
        <Categories />
      </ContentLayout>
    </MainLayout>
  );
}
