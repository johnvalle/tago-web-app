import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ActionIcon, Badge, Group } from '@mantine/core';
import { X } from 'tabler-icons-react';

import Empty from '@/components/Elements/Empty';
import { Category } from '@/database/models/Category';

export default function CategoryList() {
  const list = useLiveQuery(() => Category.getAll());

  const handleRemove = (id: string) => Category.remove(id);

  const removeButton = (id: string) => (
    <ActionIcon size="xs" radius="xl" variant="transparent" onClick={() => handleRemove(id)}>
      <X size={10} />
    </ActionIcon>
  );

  return (
    <Group>
      {!list?.length && (
        <Empty title="No categories added." content="Add a new category name below." />
      )}
      <Group>
        {list?.map((item) => (
          <Badge
            color="orange"
            variant="outline"
            radius="sm"
            size="lg"
            rightSection={removeButton(item.id)}
            key={item.id}
          >
            <Group>{item.name}</Group>
          </Badge>
        ))}
      </Group>
    </Group>
  );
}
