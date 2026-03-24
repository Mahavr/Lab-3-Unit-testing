import { Selector } from "testcafe";

fixture`Cat Search`.page`https://thecatapi.com/`;

test("Search input exists and works", async (t) => {
  const searchInput = Selector('input[type="search"]');
  await t
    .expect(searchInput.exists)
    .ok()
    .typeText(searchInput, "siamese")
    .pressKey("enter");
});
