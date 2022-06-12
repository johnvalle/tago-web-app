import { AppDB } from '../..';

import { ICategory } from './types';

export class Category {
  public static table = AppDB.category;

  static add(data: ICategory) {
    return this.table.add(data);
  }

  static delete(id: any) {
    return this.table.delete(id);
  }

  static getAll() {
    return this.table.toArray();
  }
}
