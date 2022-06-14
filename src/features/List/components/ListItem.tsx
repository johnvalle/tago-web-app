import React from 'react';
import { AES } from 'crypto-js';
import UTF8 from 'crypto-js/enc-utf8';
import { Badge, Divider, Group, Menu, Paper, Stack, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { useClipboard, useLocalStorageValue } from '@mantine/hooks';
import { ClipboardCheck, Copy, Help, Lock, LockOpen, Pencil, Trash } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

import { ISecuredItem } from '@/database/models/SecuredItem/types';
import { formatDate, pipe, truncate } from '@/utils';
import { TAGO_PIN } from '@/constants/vars';

import EditItemModal from './EditItemModal';
import DeleteItemModal from './DeleteItemModal';

interface Props {
  item: ISecuredItem;
}

export default function ListItem({ item }: Props) {
  const clipboard = useClipboard({ timeout: 500 });
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [shouldConfirm, setShouldConfirm] = React.useState<boolean>(false);
  const [pin] = useLocalStorageValue({ key: TAGO_PIN });

  const handleDecrypt = (encryptedValue: string) =>
    UTF8.stringify(AES.decrypt(encryptedValue, pin));

  const copyDecrypt = () => pipe<string>([handleDecrypt, clipboard.copy])(item.encryptedValue);

  const copyToClipboard = () => {
    if (item.isEncrypted) {
      copyDecrypt();
    } else {
      clipboard.copy(item.encryptedValue);
    }
    showNotification({
      title: 'Copied!',
      message: `${item.name} is copied to clipboard`,
      color: 'green',
      icon: <ClipboardCheck />,
    });
  };

  const getIcon = (isEncrypted: boolean) => (
    <ThemeIcon radius="lg" variant="light" color={isEncrypted ? 'green' : 'red'}>
      {isEncrypted ? <Lock size={12} /> : <LockOpen size={12} />}
    </ThemeIcon>
  );
  return (
    <Paper key={item.id} shadow="xs" p="sm">
      <EditItemModal securedItem={item} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <DeleteItemModal
        securedItem={item}
        isModalOpen={shouldConfirm}
        setIsModalOpen={setShouldConfirm}
      />
      <Group position="apart">
        <Group>
          <Stack spacing={0} align="flex-start">
            <Text weight={700}>{item.name}</Text>
            <Group spacing="xs">
              <Text size="sm" color="black">
                Stored value: {truncate(item.encryptedValue)}
              </Text>
              <Tooltip
                width={200}
                wrapLines
                label="
                  The text that you see is the private
                  information is stored in the application.
                  If it is displayed as it was added, consider
                  encrypting the item.
                "
              >
                <Help size={14} color="gray" />
              </Tooltip>
            </Group>
            <Text size="xs" color="dimmed">
              {formatDate(item.dateCreated)}
            </Text>
            <Group spacing="xs" mt="md">
              <Badge
                sx={{ paddingLeft: 0, marginRight: 0 }}
                color={item.isEncrypted ? 'green' : 'red'}
                leftSection={getIcon(item.isEncrypted)}
              >
                {item.isEncrypted ? 'Encrypted' : 'Unsafe'}
              </Badge>
              <Badge color="gray">{item.category ?? 'General'}</Badge>
            </Group>
          </Stack>
        </Group>
        <Menu>
          <Menu.Label>{item.name}</Menu.Label>
          <Menu.Item icon={<Copy size={14} />} onClick={copyToClipboard}>
            Copy
          </Menu.Item>
          <Menu.Item icon={<Pencil size={14} />} onClick={() => setIsModalOpen(true)}>
            Edit
          </Menu.Item>
          <Divider />
          <Menu.Item color="red" icon={<Trash size={14} />} onClick={() => setShouldConfirm(true)}>
            Delete
          </Menu.Item>
        </Menu>
      </Group>
    </Paper>
  );
}
