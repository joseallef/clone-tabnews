/* eslint-disable jest/no-commented-out-tests */
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });
});

// Only test => indica ao jest que execute apneas esse test e pule o demais!
// test.only("Teste de SQL Injection", async () => {
//   await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --");

// })
