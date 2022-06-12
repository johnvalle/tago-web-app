import React from 'react';
import { Link } from 'react-router-dom';

import { Anchor, Group, Header, Stack, Title } from '@mantine/core';
import { ROUTES } from '@/constants/vars';

export function AppHeader() {
  return (
    <Header height={60}>
      <Stack justify="center" sx={{ height: '100%' }} p="xl">
        <Group position="apart">
          <Title order={4}>Tago</Title>
          <Group spacing="md">
            <Anchor component={Link} to={ROUTES.HOME}>
              Home
            </Anchor>
            <Anchor component={Link} to={ROUTES.LIST}>
              My List
            </Anchor>
            <Anchor component={Link} to={ROUTES.SETTINGS}>
              Settings
            </Anchor>
          </Group>
        </Group>
      </Stack>
    </Header>
  );
}
