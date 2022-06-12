import React from 'react';

import { Divider } from '@mantine/core';

import { ContentLayout, MainLayout } from '@/components/Layout';

import { UpdatePin } from '../components/UpdatePin';

export function Settings() {
  return (
    <MainLayout>
      <ContentLayout header={{ title: 'Settings' }}>
        <Divider variant="dashed" />
        <UpdatePin />
      </ContentLayout>
    </MainLayout>
  );
}
