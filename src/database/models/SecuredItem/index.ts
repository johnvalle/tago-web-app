import { AppDB } from '../..';

import { ISecuredItem } from './types';

export const SecuredItem = (() => {
  const table = AppDB.securedItems;

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
})();
