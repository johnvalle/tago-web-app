import React from 'react';
import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { SecuredItem } from '@/database/models/SecuredItem';

import { ISecuredItem } from '@/database/models/SecuredItem/types';

interface Props {
  securedItem: ISecuredItem;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteItemModal({ securedItem, isModalOpen, setIsModalOpen }: Props) {
  const handleRemove = () => {
    SecuredItem.delete(securedItem.id);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={handleModalClose} title="Delete item">
      <Stack>
        <Title order={5}>Deleting {securedItem.name}</Title>
        <Stack spacing={0}>
          <Text color="dimmed" size="sm">
            Are you sure you want to permanently remove this item from the list? Once deleted it
            cannot be recovered.
          </Text>
        </Stack>
        <Group position="right" pt="lg">
          <Group spacing="md">
            <Button color="gray" variant="light" onClick={handleRemove}>
              Yes, delete
            </Button>
            <Button onClick={handleModalClose}>Back to safety</Button>
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
}
