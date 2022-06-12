import React from 'react';
import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { MoodEmpty } from 'tabler-icons-react';

interface Props {
  title: string;
  content: string;
}

export default function Empty({ title, content }: Props) {
  return (
    <Paper shadow="xs" p="md">
      <Group>
        <MoodEmpty size={24} />
        <Stack spacing={0}>
          <Title order={6}>{title}</Title>
          <Text color="dimmed">{content}</Text>
        </Stack>
      </Group>
    </Paper>
  );
}
