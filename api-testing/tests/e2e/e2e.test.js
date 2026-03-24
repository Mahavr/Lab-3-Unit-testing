const puppeteer = require("puppeteer");

jest.setTimeout(120000); // 2 хв таймаут для довгих операцій

describe("SauceDemo User Scenarios", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      defaultViewport: null,
    });
    page = await browser.newPage();
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle2",
    });
  });

  afterEach(async () => {
    if (browser) await browser.close();
  });

  // ========================
  // Scenario 1 — Login
  // ========================
  test("User can log in with standard_user", async () => {
    await page.waitForSelector("#user-name");
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_list");
    const url = page.url();
    expect(url).toContain("inventory.html");
  });

  // =================================
  // Scenario 2 — Add product to cart
  // =================================
  test("User can add first product to cart", async () => {
    // логін
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_list");


    await page.click(".inventory_item:first-child button");


    await page.waitForFunction(
      () => document.querySelector(".shopping_cart_badge")?.textContent === "1",
    );

    const cartCount = await page.$eval(
      ".shopping_cart_badge",
      (el) => el.textContent,
    );
    expect(cartCount).toBe("1");
  });

  // =================================
  // Scenario 3 — Open cart and check product
  // =================================
  test("User can open cart and see added product", async () => {
    // логін
    await page.type("#user-name", "standard_user");
    await page.type("#password", "secret_sauce");
    await page.click("#login-button");

    await page.waitForSelector(".inventory_list");

  
    await page.click(".inventory_item:first-child button");

    await page.click(".shopping_cart_link");

    await page.waitForSelector(".cart_list .cart_item");

    const cartItemName = await page.$eval(
      ".cart_list .cart_item .inventory_item_name",
      (el) => el.textContent,
    );
    expect(cartItemName.length).toBeGreaterThan(0);
  });
});