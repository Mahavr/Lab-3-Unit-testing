const axios = require("axios");

const BASE_URL = "https://petstore.swagger.io/v2";

const testPet = {
  id: Math.floor(Math.random() * 1000000),
  name: "TestPet",
  status: "available",
};

describe("Petstore API - Full Test Sets", () => {
  describe("GET /pet/findByStatus (all pets)", () => {
    test("Get all available pets", async () => {
      const res = await axios.get(
        `${BASE_URL}/pet/findByStatus?status=available`,
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
    });

    test("Get all sold pets", async () => {
      const res = await axios.get(`${BASE_URL}/pet/findByStatus?status=sold`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
    });

    test("Get all pets with multiple statuses", async () => {
      const res = await axios.get(
        `${BASE_URL}/pet/findByStatus?status=available,sold`,
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
    });

    test("Get pets with unknown status", async () => {
      const res = await axios.get(
        `${BASE_URL}/pet/findByStatus?status=unknown`,
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
      expect(res.data.length).toBe(0);
    });

    test("Get pets without status parameter", async () => {
      const res = await axios.get(`${BASE_URL}/pet/findByStatus`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.data)).toBe(true);
    });
  });

  describe("GET /pet/{id} (specific pet)", () => {
    test("Get existing pet", async () => {
      await axios.post(`${BASE_URL}/pet`, testPet);
      const res = await axios.get(`${BASE_URL}/pet/${testPet.id}`);
      expect(res.status).toBe(200);
      expect(res.data.id).toBe(testPet.id);
    });

    test("Get non-existing pet", async () => {
      try {
        await axios.get(`${BASE_URL}/pet/999999999`);
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });

    test("Get pet with negative id", async () => {
      try {
        await axios.get(`${BASE_URL}/pet/-1`);
      } catch (err) {
        expect([400, 404]).toContain(err.response.status);
      }
    });

    test("Get pet with text id", async () => {
      try {
        await axios.get(`${BASE_URL}/pet/abc`);
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Get pet with id 0", async () => {
      try {
        await axios.get(`${BASE_URL}/pet/0`);
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });
  });

  describe("POST /pet (add pet)", () => {
    test("Add new pet", async () => {
      const res = await axios.post(`${BASE_URL}/pet`, testPet);
      expect(res.status).toBe(200);
      expect(res.data.id).toBe(testPet.id);
    });

    test("Add pet without name", async () => {
      try {
        await axios.post(`${BASE_URL}/pet`, {
          id: testPet.id,
          status: "available",
        });
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Add pet with existing id", async () => {
      const res = await axios.post(`${BASE_URL}/pet`, testPet);
      expect(res.status).toBe(200);
    });

    test("Add pet with invalid JSON", async () => {
      try {
        await axios.post(`${BASE_URL}/pet`, "invalid json");
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Add pet with extra fields", async () => {
      const res = await axios.post(`${BASE_URL}/pet`, {
        ...testPet,
        extra: "field",
      });
      expect(res.status).toBe(200);
      expect(res.data.extra).toBe("field");
    });
  });

  describe("PUT /pet (update pet)", () => {
    test("Update existing pet", async () => {
      const updatedPet = { ...testPet, status: "sold" };
      const res = await axios.put(`${BASE_URL}/pet`, updatedPet);
      expect(res.status).toBe(200);
      expect(res.data.status).toBe("sold");
    });

    test("Update non-existing pet", async () => {
      try {
        await axios.put(`${BASE_URL}/pet`, { id: 999999999, name: "GhostPet" });
      } catch (err) {
        expect([400, 404]).toContain(err.response.status);
      }
    });

    test("Update pet without id", async () => {
      try {
        await axios.put(`${BASE_URL}/pet`, { name: "NoIdPet" });
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Update pet with invalid JSON", async () => {
      try {
        await axios.put(`${BASE_URL}/pet`, "invalid json");
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Change pet status", async () => {
      const res = await axios.put(`${BASE_URL}/pet`, {
        ...testPet,
        status: "pending",
      });
      expect(res.status).toBe(200);
      expect(res.data.status).toBe("pending");
    });
  });

  describe("DELETE /pet/{id}", () => {
    test("Delete existing pet", async () => {
      const res = await axios.delete(`${BASE_URL}/pet/${testPet.id}`);
      expect(res.status).toBe(200);
    });

    test("Delete non-existing pet", async () => {
      try {
        await axios.delete(`${BASE_URL}/pet/999999999`);
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });

    test("Delete pet with text id", async () => {
      try {
        await axios.delete(`${BASE_URL}/pet/abc`);
      } catch (err) {
        expect(err.response.status).toBe(400);
      }
    });

    test("Delete pet with id 0", async () => {
      try {
        await axios.delete(`${BASE_URL}/pet/0`);
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });

    test("Delete pet twice", async () => {
      try {
        await axios.delete(`${BASE_URL}/pet/${testPet.id}`);
      } catch (err) {
        expect(err.response.status).toBe(404);
      }
    });
  });
});
