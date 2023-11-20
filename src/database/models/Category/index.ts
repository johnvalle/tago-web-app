import { AppDB, TagoDatabase } from '../..';
import { FakeDB } from './../../index';

import { ICategory } from './types';

export const TagoCategory = ((tableArgs: TagoDatabase['category']) => {
  const table = tableArgs;

  const add = (data: ICategory) => table.add(data);
  const remove = (id: any) => table.delete(id);
  const getAll = () => table.toArray();

  return {
    add,
    remove,
    getAll,
  };
});

export const Category = TagoCategory(AppDB.category);
export const FakeCategory = TagoCategory(FakeDB.category);