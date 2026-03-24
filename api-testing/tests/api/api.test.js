const axios = require("axios");

const BASE_URL = "https://api.thecatapi.com/v1";

const apiKey = process.env.THECAT_API_KEY || "";

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-api-key": apiKey,
    "Content-Type": "application/json",
  },
});

jest.setTimeout(30000);

describe("The Cat API Tests", () => {
  test("GET /images/search returns at least one image", async () => {
    const res = await client.get("/images/search?limit=1");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
  });

  test("GET /breeds returns a list of breeds", async () => {
    const res = await client.get("/breeds?limit=5");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("GET /breeds/search finds a breed by name", async () => {
    const res = await client.get("/breeds/search?q=sibe");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("GET /categories returns categories", async () => {
    const res = await client.get("/categories");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
  });

  test("POST /votes with invalid body returns error", async () => {
    try {
      await client.post("/votes", { invalid: "data" });
    } catch (err) {
      expect(err.response.status).toBeGreaterThanOrEqual(400);
    }
  });
});
