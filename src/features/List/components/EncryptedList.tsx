import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Button, Popover, SimpleGrid, Stack, Text } from '@mantine/core';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';

import { SecuredItem } from '@/database/models/SecuredItem';
import { ContentLayout } from '@/components/Layout';
import { ROUTES, TAGO_PIN } from '@/constants/vars';
import Empty from '@/components/Elements/Empty';

import ListItem from './ListItem';
import AddItemModal from './AddItemModal';

export function EncryptedList() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);

  const [pin] = useLocalStorage({ key: TAGO_PIN, defaultValue: '' });
  const list = useLiveQuery(() => SecuredItem.getAll());
  const navigate = useNavigate();

  const handleAddItem = () => {
    if (!pin) return setIsPopoverOpen(true);
    return setIsModalOpen(!isModalOpen);
  };

  return (
    <ContentLayout
      header={{
        title: 'My List',
        children: (
          <Popover
            opened={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            withArrow
            position="bottom"
            width={300}
            target={<Button onClick={handleAddItem}>Add item</Button>}
          >
            <Stack>
              <Stack spacing={0}>
                <Text>A pin is required to add an item.</Text>
                <Text size="xs" color="dimmed">
                  Adding a pin ensures items are safe and secured.
                </Text>
              </Stack>
              <Button color="cyan" variant="outline" onClick={() => navigate(ROUTES.SETTINGS)}>
                Add a pin
              </Button>
            </Stack>
          </Popover>
        ),
      }}
    >
      <Stack>
        <AddItemModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        {!list?.length && (
          <Empty
            title="Uh oh! Nothing to show here."
            content="No item has been added to your list."
          />
        )}
        {list &&
          list.map((item) => (
            <SimpleGrid cols={2}>
              <ListItem item={item} key={item.id} />
            </SimpleGrid>
          ))}
      </Stack>
    </ContentLayout>
  );
}
