import { AppDB } from '../..';

import { ISecuredItem } from './types';

export class SecuredItem {
  public static table = AppDB.securedItems;

  static add(data: ISecuredItem) {
    return this.table.add(data);
  }

  static update(id: any, data: Partial<ISecuredItem>) {
    return this.table.update(id, data);
  }

  static delete(id: any) {
    return this.table.delete(id);
  }

  static getAll() {
    return this.table.toArray();
  }
}
