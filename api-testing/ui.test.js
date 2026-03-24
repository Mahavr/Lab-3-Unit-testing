const puppeteer = require("puppeteer");
jest.setTimeout(60000);

describe("React TodoMVC UI Tests", () => {
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
    await page.goto("https://todomvc.com/examples/react/dist/", {
      waitUntil: "networkidle2",
    });
  });

  afterEach(async () => {
    if (browser) await browser.close();
  });

  test("Test case 1: Add new task", async () => {
    await page.waitForSelector(".new-todo");
    const taskText = "Buy milk";
    await page.type(".new-todo", taskText);
    await page.keyboard.press("Enter");
    const addedText = await page.$eval(
      ".todo-list li label",
      (el) => el.textContent,
    );
    expect(addedText).toBe(taskText);
  });

  test("Test case 2: Mark task as completed", async () => {
    await page.waitForSelector(".new-todo");
    await page.type(".new-todo", "Task A");
    await page.keyboard.press("Enter");

    await page.click(".todo-list li .toggle");
    const classAttr = await page.$eval(".todo-list li", (el) => el.className);
    expect(classAttr).toContain("completed");
  });

  test("Test case 3: Delete task", async () => {
    await page.waitForSelector(".new-todo");
    await page.type(".new-todo", "Task B");
    await page.keyboard.press("Enter");

    await page.hover(".todo-list li");
    await page.click(".todo-list li .destroy");

    const listCount = await page.$$eval(".todo-list li", (els) => els.length);
    expect(listCount).toBe(0);
  });

  test("Test case 4: Filter Completed", async () => {
    await page.waitForSelector(".new-todo");
    await page.type(".new-todo", "Task C");
    await page.keyboard.press("Enter");
    await page.type(".new-todo", "Task D");
    await page.keyboard.press("Enter");

    await page.click(".todo-list li .toggle"); // mark first
    await page.click("a[href='#/completed']");

    const classes = await page.$$eval(".todo-list li", (els) =>
      els.map((e) => e.className),
    );
    expect(classes.every((c) => c.includes("completed"))).toBe(true);
  });

  test("Test case 5: Filter Active", async () => {
    await page.waitForSelector(".new-todo");
    await page.type(".new-todo", "Task E");
    await page.keyboard.press("Enter");
    await page.type(".new-todo", "Task F");
    await page.keyboard.press("Enter");

    await page.click(".todo-list li .toggle"); // mark first
    await page.click("a[href='#/active']");

    const classes = await page.$$eval(".todo-list li", (els) =>
      els.map((e) => e.className),
    );
    expect(classes.every((c) => !c.includes("completed"))).toBe(true);
  });
});
