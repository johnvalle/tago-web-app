import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageValue } from '@mantine/hooks';
import { Button, Popover, Stack, Text } from '@mantine/core';

import { ContentLayout, MainLayout } from '@/components/Layout';
import { TAGO_PIN } from '@/constants/vars';

import { EncryptedList } from '../components/EncryptedList';
import AddItemModal from '../components/AddItemModal';

export function List() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [pin] = useLocalStorageValue({ key: TAGO_PIN });

  const handleAddItem = () => {
    if (!pin) return setIsPopoverOpen(true);
    return setIsModalOpen(!isModalOpen);
  };
  return (
    <MainLayout>
      <ContentLayout
        header={{
          title: 'My List',
          children: (
            <Popover
              data-testid="pinRequiredDialog"
              opened={isPopoverOpen}
              onClose={() => setIsPopoverOpen(false)}
              withArrow
              position="bottom"
              width={300}
              target={<Button data-testid="addItemBtn" onClick={handleAddItem}>Add item</Button>}
            >
              <Stack>
                <Stack spacing={0}>
                  <Text>A pin is required to add an item.</Text>
                  <Text size="xs" color="dimmed">
                    Adding a pin ensures items are safe and secured.
                  </Text>
                </Stack>
                <Button color="violet" variant="outline" onClick={() => navigate('/settings')}>
                  Add a pin
                </Button>
              </Stack>
            </Popover>
          ),
        }}
      >
        <AddItemModal data-testid="addItemModal" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <EncryptedList />
      </ContentLayout>
    </MainLayout>
  );
}
