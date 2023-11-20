
import { describe, it, expect } from 'vitest';
import { nanoid } from 'nanoid';
import { FakeSecuredItem } from '@/database/models/SecuredItem';
import { AES } from 'crypto-js';


describe("Secured item table", () => {
  const id1 = nanoid();

  it("should add a secured item", async () => {
    const result = await FakeSecuredItem.add({
      id: id1,
      name: "mySecuredItem",
      encryptedValue: AES.encrypt("myRawString", "myP!in321").toString(),
      dateCreated: new Date().toUTCString(),
      isEncrypted: true,
      category: "myCategory"
    });

    expect(result).toBe(id1);
  });

  it("should add retrieve a secured item", async () => {
    const res = await FakeSecuredItem.getAll();
    expect(res).toHaveLength(1);
  });

  it("should remove a secured item", async () => {
    FakeSecuredItem.remove(id1);
    const securedItems = await FakeSecuredItem.getAll();
    expect(securedItems).toHaveLength(0);
  })
});