const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("SauceDemo UI Tests", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    page = await browser.newPage();

    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "domcontentloaded",
    });

    // чекати поля логіну
    await page.waitForSelector("#user-name", { visible: true });

    // логін
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    // чекати редірект на inventory
    await page.waitForFunction(() =>
      window.location.href.includes("inventory"),
    );

    // чекати товари
    await page.waitForSelector(".inventory_item", { visible: true });
  });

  afterEach(async () => {
    if (browser) await browser.close();
  });

  // ==========================
  // 1. Products visible
  // ==========================
  test("All products are displayed", async () => {
    const products = await page.$$(".inventory_item");
    expect(products.length).toBeGreaterThan(0);
  });

  // ==========================
  // 2. Buttons exist
  // ==========================
  test("Add to cart buttons exist", async () => {
    const buttons = await page.$$(".inventory_item button");
    expect(buttons.length).toBeGreaterThan(0);
  });

  // ==========================
  // 3. Sorting works
  // ==========================
  test("Sorting by price low to high works", async () => {
    await page.waitForSelector(".product_sort_container");

    await page.select(".product_sort_container", "lohi");

    const prices = await page.$$eval(".inventory_item_price", (els) =>
      els.map((e) => parseFloat(e.textContent.replace("$", ""))),
    );

    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  // ==========================
  // 4. Cart badge updates
  // ==========================
  test("Cart badge updates after adding product", async () => {
    await page.click(".inventory_item button");

    await page.waitForSelector(".shopping_cart_badge", { visible: true });

    const badge = await page.$eval(
      ".shopping_cart_badge",
      (el) => el.textContent,
    );

    expect(parseInt(badge)).toBe(1);
  });

  // ==========================
  // 5. Remove button appears
  // ==========================
  test("Remove button appears after adding product", async () => {
    await page.click(".inventory_item button");

    await page.waitForFunction(() => {
      const btn = document.querySelector(".inventory_item button");
      return btn && btn.textContent.toLowerCase() === "remove";
    });

    const text = await page.$eval(
      ".inventory_item button",
      (el) => el.textContent,
    );

    expect(text.toLowerCase()).toBe("remove");
  });
});
