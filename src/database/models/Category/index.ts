import { AppDB } from '../..';

import { ICategory } from './types';

export const Category = (() => {
  const table = AppDB.category;

  const add = (data: ICategory) => table.add(data);
  const remove = (id: any) => table.delete(id);
  const getAll = () => table.toArray();

  return {
    add,
    remove,
    getAll,
  };
})();
