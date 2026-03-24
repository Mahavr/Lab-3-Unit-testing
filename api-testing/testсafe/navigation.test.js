import { Selector } from "testcafe";

fixture`Navigation Test`.page`https://thecatapi.com/`;

test("Check navigation menu", async (t) => {
  const navLink = Selector("a").withText("Docs");
  await t
    .click(navLink)
    .expect(Selector("h1").innerText)
    .contains("API Documentation");
});
