import React from 'react';

import { Container, Group, Stack, Title } from '@mantine/core';

interface Props {
  children: React.ReactNode;
  header: {
    title: string;
    children?: React.ReactNode;
  };
}

export function ContentLayout({ children, header }: Props) {
  return (
    <Container sx={{ minHeight: 'calc(100vh - var(--mantine-header-height))' }}>
      <Stack>
        <Group position="apart">
          <Title order={3}>{header.title}</Title>
          {header.children}
        </Group>
        {children}
      </Stack>
    </Container>
  );
}
