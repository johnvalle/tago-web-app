import React from 'react';
import UTF8 from 'crypto-js/enc-utf8';
import { AES } from 'crypto-js';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Group, Modal, Stack } from '@mantine/core';
import { useLocalStorageValue } from '@mantine/hooks';

import { SecuredItem } from '@/database/models/SecuredItem';
import { ISecuredItem } from '@/database/models/SecuredItem/types';
import { TAGO_PIN } from '@/constants/vars';

import { SecuredItemFormData } from '../types';
import ItemForm from './ItemForm';

interface Props {
  securedItem: ISecuredItem;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditItemModal({ securedItem, isModalOpen, setIsModalOpen }: Props) {
  const [pin] = useLocalStorageValue({ key: TAGO_PIN });
  const formMethods = useForm<SecuredItemFormData>({
    defaultValues: {
      name: securedItem.name,
      encryptedValue: securedItem.isEncrypted
        ? UTF8.stringify(AES.decrypt(securedItem.encryptedValue, pin))
        : securedItem.encryptedValue,
      isEncrypted: securedItem.isEncrypted,
      category: securedItem.category,
    },
  });

  const updateForm = (newData: ISecuredItem) => {
    formMethods.reset(newData);
    setIsModalOpen(false);
  };

  const handleEditItem = (data: SecuredItemFormData) => {
    SecuredItem.update(securedItem.id, {
      name: data.name,
      encryptedValue: data.isEncrypted
        ? AES.encrypt(data.encryptedValue, pin).toString()
        : data.encryptedValue,
      isEncrypted: data.isEncrypted,
      category: data.category,
    });

    updateForm({ securedItem, ...data } as ISecuredItem);
  };

  const resetState = () => {
    formMethods.reset();
    setIsModalOpen(false);
  };

  return (
    <Modal opened={isModalOpen} onClose={resetState} title="Edit item">
      <Stack>
        <FormProvider {...formMethods}>
          <ItemForm />
        </FormProvider>
        <Group position="right">
          <Button
            onClick={formMethods.handleSubmit(handleEditItem)}
            disabled={!formMethods.formState.isDirty}
          >
            Save changes
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
