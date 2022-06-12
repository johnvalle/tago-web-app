import React from 'react';
import { AppShell } from '@mantine/core';

import { AppHeader } from '../Elements/AppHeader';

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <AppShell
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
