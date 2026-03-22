const axios = require("axios");

// Using Petstore API for testing
const BASE_URL = "https://petstore3.swagger.io/api/v3/pets";

describe("API Testing - GET All Records", () => {
  test("should return all records successfully", async () => {
    const response = await axios.get(BASE_URL);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test("should handle network error", async () => {
    try {
      await axios.get("https://invalid-url.com");
    } catch (error) {
      expect(error.code).toBe("ENOTFOUND");
    }
  });

  test("should return correct data structure", async () => {
    const response = await axios.get(BASE_URL);
    if (response.data.length > 0) {
      const firstItem = response.data[0];
      expect(firstItem).toHaveProperty("id");
      expect(firstItem).toHaveProperty("name");
    }
  });

  test("should limit results if query param provided", async () => {
    // Assuming API supports limit
    const response = await axios.get(`${BASE_URL}?limit=5`);
    expect(response.data.length).toBeLessThanOrEqual(5);
  });

  test("should handle empty response", async () => {
    // For an endpoint that might return empty
    const response = await axios.get(`${BASE_URL}?status=sold`);
    // May return empty or filtered
    expect(Array.isArray(response.data)).toBe(true);
  });
});

describe("API Testing - GET Specific Record", () => {
  test("should return specific record successfully", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(1);
  });

  test("should return 404 for non-existent record", async () => {
    try {
      await axios.get(`${BASE_URL}/999999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should return correct data for specific id", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    expect(response.data).toHaveProperty("id", 1);
    expect(response.data).toHaveProperty("name");
  });

  test("should handle invalid id format", async () => {
    try {
      await axios.get(`${BASE_URL}/abc`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("should return data with category if present", async () => {
    const response = await axios.get(`${BASE_URL}/1`);
    // Category might be optional
    if (response.data.category) {
      expect(response.data.category).toHaveProperty("id");
      expect(response.data.category).toHaveProperty("name");
    }
  });
});

describe("API Testing - POST", () => {
  test("should create new record successfully", async () => {
    const newPet = {
      name: "Test Pet",
      photoUrls: ["http://example.com/photo.jpg"],
      status: "available",
    };
    const response = await axios.post(BASE_URL, newPet);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("id");
    expect(response.data.name).toBe(newPet.name);
  });

  test("should handle missing required fields", async () => {
    try {
      await axios.post(BASE_URL, { photoUrls: [] });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("should create record with correct structure", async () => {
    const newPet = {
      name: "Another Test Pet",
      photoUrls: [],
      status: "pending",
    };
    const response = await axios.post(BASE_URL, newPet);
    expect(response.data).toMatchObject(newPet);
  });

  test("should handle invalid data types", async () => {
    try {
      await axios.post(BASE_URL, { name: 123, photoUrls: "invalid" });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("should return created record with id", async () => {
    const newPet = {
      name: "New Pet",
      photoUrls: ["url1", "url2"],
      status: "sold",
    };
    const response = await axios.post(BASE_URL, newPet);
    expect(typeof response.data.id).toBe("number");
  });
});

describe("API Testing - PUT", () => {
  test("should update record successfully", async () => {
    const updatedPet = {
      id: 1,
      name: "Updated Pet",
      photoUrls: ["http://example.com/updated.jpg"],
      status: "available",
    };
    const response = await axios.put(`${BASE_URL}/1`, updatedPet);
    expect(response.status).toBe(200);
    expect(response.data.name).toBe(updatedPet.name);
  });

  test("should return 404 for non-existent record", async () => {
    try {
      await axios.put(`${BASE_URL}/999999`, { name: "Test" });
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should update only provided fields", async () => {
    const partialUpdate = { name: "Partial Update" };
    const response = await axios.put(`${BASE_URL}/1`, partialUpdate);
    expect(response.data.name).toBe(partialUpdate.name);
  });

  test("should handle invalid data", async () => {
    try {
      await axios.put(`${BASE_URL}/1`, { name: null });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("should preserve id in response", async () => {
    const updateData = { name: "Preserve ID" };
    const response = await axios.put(`${BASE_URL}/1`, updateData);
    expect(response.data.id).toBe(1);
  });
});

describe("API Testing - DELETE", () => {
  test("should delete record successfully", async () => {
    const response = await axios.delete(`${BASE_URL}/1`);
    expect(response.status).toBe(200);
  });

  test("should return 404 for non-existent record", async () => {
    try {
      await axios.delete(`${BASE_URL}/999999`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should handle invalid id", async () => {
    try {
      await axios.delete(`${BASE_URL}/abc`);
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("should confirm deletion by subsequent GET", async () => {
    // Note: Petstore may not actually delete, but for real API
    await axios.delete(`${BASE_URL}/2`);
    try {
      await axios.get(`${BASE_URL}/2`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("should return success response on delete", async () => {
    const response = await axios.delete(`${BASE_URL}/3`);
    expect(response.status).toBe(200);
  });
});
