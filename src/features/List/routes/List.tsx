import React from 'react';

import { MainLayout } from '@/components/Layout';

import { EncryptedList } from '../components/EncryptedList';

export function List() {
  return (
    <MainLayout>
      <EncryptedList />
    </MainLayout>
  );
}
