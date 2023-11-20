
import { describe, it, expect } from 'vitest'; // <
import { FakeCategory } from '../../database/models/Category';
import { nanoid } from 'nanoid';


describe("Category table", () => {
  const id1 = nanoid();
  const id2 = nanoid();

  it("should add category", async () => {
    const res = await FakeCategory.add({ dateCreated: new Date().toUTCString(), id: id1, name: "Test" });
    expect(res).toBe(id1);
  });

  it ("should retrieve categories", async () => {
    FakeCategory.add({ dateCreated: new Date().toUTCString(), id: id2, name: "Test" });
    const categories = await FakeCategory.getAll();
    categories.forEach((category) => {
      expect(category).toHaveProperty("id");
    })
  })

  it("should remove categories", async () => {
    FakeCategory.remove(id1);
    FakeCategory.remove(id2);
    const categories = await FakeCategory.getAll();
    expect(categories).toHaveLength(0);
  })
});