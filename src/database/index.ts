import { Dexie } from 'dexie';
import { ICategory } from './models/Category/types';

import { ISecuredItem } from './models/SecuredItem/types';

export class TagoDatabase extends Dexie {
  public securedItems!: Dexie.Table<ISecuredItem, 'id'>;

  public category!: Dexie.Table<ICategory, 'id'>;

  constructor() {
    super('TagoDatabase');
    this.version(1).stores({
      securedItems: '++id, name, encryptedValue, dateCreated, isEncrypted, category',
      category: '++id, name, dateCreated',
    });
  }
}

export const AppDB = new TagoDatabase();
