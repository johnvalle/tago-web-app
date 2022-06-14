import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ActionIcon, Badge, Group } from '@mantine/core';
import { MoodSad, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

import Empty from '@/components/Elements/Empty';
import { Category } from '@/database/models/Category';
import { SecuredItem } from '@/database/models/SecuredItem';
import { ICategory } from '@/database/models/Category/types';

export default function CategoryList() {
  const [categoryToRemove, setCategoryToRemove] = React.useState<ICategory | null>(null);
  const list = useLiveQuery(() => Category.getAll());
  const encryptedList = useLiveQuery(() => SecuredItem.getAll());

  const usedCategories = React.useCallback(() => {
    if (encryptedList && encryptedList.length) {
      const categories = encryptedList.map(({ category }) => category);
      return categories.filter((category): category is string => !!category);
    }
    return [];
  }, [encryptedList]);

  const removeButton = (category: ICategory) => (
    <ActionIcon
      size="xs"
      radius="xl"
      variant="transparent"
      onClick={() => setCategoryToRemove(category)}
    >
      <X size={10} />
    </ActionIcon>
  );

  React.useEffect(() => {
    console.log(usedCategories(), categoryToRemove);
    if (categoryToRemove) {
      if (usedCategories().includes(categoryToRemove.name)) {
        showNotification({
          title: `${categoryToRemove.name} can't be deleted.`,
          message: 'This category is being used. Consider changing item using this category first.',
          color: 'orange',
          icon: <MoodSad />,
        });
        setCategoryToRemove(null);
      } else {
        Category.remove(categoryToRemove.id);
      }
    }
  }, [categoryToRemove, usedCategories]);

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
            rightSection={removeButton(item)}
            key={item.id}
          >
            <Group>{item.name}</Group>
          </Badge>
        ))}
      </Group>
    </Group>
  );
}
