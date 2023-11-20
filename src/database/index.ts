import { Dexie, DexieConstructor, DexieOptions } from 'dexie';
import indexedDB from 'fake-indexeddb'
import { ICategory } from './models/Category/types';

import { ISecuredItem } from './models/SecuredItem/types';

export class TagoDatabase extends Dexie {
  public securedItems!: Dexie.Table<ISecuredItem, 'id'>;
  public category!: Dexie.Table<ICategory, 'id'>;

  constructor(databaseName: string, options?: DexieOptions) {
    super(databaseName, options);
    this.version(1).stores({
      securedItems: '++id, name, encryptedValue, dateCreated, isEncrypted, category',
      category: '++id, name, dateCreated',
    });
  }
}

export const FakeDB = new TagoDatabase("FakeDatabase", { indexedDB: indexedDB });
export const AppDB = new TagoDatabase("TagoDatabase");
