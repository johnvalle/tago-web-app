import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AES } from 'crypto-js';
import { nanoid } from 'nanoid';
import { Button, Group, Modal, Stack } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';

import { TAGO_PIN } from '@/constants/vars';
import { SecuredItem } from '@/database/models/SecuredItem';

import { SecuredItemFormData } from '../types';

import ItemForm from './ItemForm';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddItemModal({ isModalOpen, setIsModalOpen }: Props) {
  const [pin] = useLocalStorageValue({ key: TAGO_PIN });
  const formMethods = useForm<SecuredItemFormData>({
    defaultValues: {
      name: '',
      encryptedValue: '',
      isEncrypted: true,
    },
  });

  const resetStates = () => {
    formMethods.reset();
    setIsModalOpen(false);
  };

  const handleAddItem = (data: SecuredItemFormData) => {
    SecuredItem.add({
      id: nanoid(),
      name: data.name,
      encryptedValue: data.isEncrypted
        ? AES.encrypt(data.encryptedValue, pin).toString()
        : data.encryptedValue,
      dateCreated: new Date().toUTCString(),
      isEncrypted: Boolean(data.isEncrypted),
    });
    resetStates();
  };

  return (
    <Modal opened={isModalOpen} onClose={resetStates} title="Add item">
      <Stack>
        <FormProvider {...formMethods}>
          <ItemForm />
        </FormProvider>
        <Group position="right">
          <Button onClick={formMethods.handleSubmit(handleAddItem)}>Add</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
