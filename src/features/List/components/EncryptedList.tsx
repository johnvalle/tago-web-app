import React from 'react';
import { SimpleGrid, Stack } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';

import { SecuredItem } from '@/database/models/SecuredItem';
import Empty from '@/components/Elements/Empty';

import ListItem from './ListItem';

export function EncryptedList() {
  const list = useLiveQuery(() => SecuredItem.getAll());

  return (
    <Stack>
      {!list?.length && (
        <Empty
          title="Uh oh! Nothing to show here."
          content="No item has been added to your list."
        />
      )}
      {list && (
        <SimpleGrid cols={2}>
          {list.map((item) => (
            <ListItem item={item} key={item.id} />
          ))}
        </SimpleGrid>
      )}
    </Stack>
  );
}
