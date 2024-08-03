/* eslint-disable jest/no-commented-out-tests */
import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("GET to /api/v1/migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

// Only test => indica ao jest que execute apneas esse test e pule o demais!
// test.only("Teste de SQL Injection", async () => {
//   await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --");

// })
