import { AppDB, FakeDB, TagoDatabase } from '../..';

import { ISecuredItem } from './types';

export const TagoSecuredItem = (tableArgs: TagoDatabase['securedItems']) => {
  const table = tableArgs;

  const add = (data: ISecuredItem) => table.add(data);
  const update = (id: any, data: Partial<ISecuredItem>) => table.update(id, data);
  const remove = (id: any) => table.delete(id);
  const getAll = () => table.toArray();

  return {
    add,
    update,
    remove,
    getAll,
  };
};

export const SecuredItem = TagoSecuredItem(AppDB.securedItems);
export const FakeSecuredItem = TagoSecuredItem(FakeDB.securedItems);