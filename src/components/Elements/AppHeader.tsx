import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Anchor, Group, Header, Stack, Title, useMantineTheme } from '@mantine/core';
import { ROUTES } from '@/AppRouter';

export function AppHeader() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const theme = useMantineTheme();

  return (
    <Header height={60}>
      <Stack justify="center" sx={{ height: '100%' }} p="xl">
        <Group position="apart">
          <Title order={4}>Tago</Title>
          <Group spacing="md">
            {ROUTES.map((route) => (
              <Anchor
                key={nanoid()}
                component={Link}
                to={route.path}
                sx={
                  isActive(route.path)
                    ? { color: theme.colors.cyan[6] }
                    : { color: theme.colors.gray[6] }
                }
              >
                {route.name}
              </Anchor>
            ))}
          </Group>
        </Group>
      </Stack>
    </Header>
  );
}
