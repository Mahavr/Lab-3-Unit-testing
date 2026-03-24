import { Selector } from "testcafe";

fixture`The Cat API Tests`.page`https://thecatapi.com/`;

test("Main page loads", async (t) => {
  await t.expect(Selector("h1").innerText).contains("The Cat API");
});
