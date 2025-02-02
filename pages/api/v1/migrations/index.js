import { createRouter } from "next-connect";
import database from "infra/database";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getMigrationsHandle).post(postMigrationsHandle);

export default router.handler(controller.onErrorHandlers);

async function getMigrationsHandle(request, response) {
  const { migratedMigrations } = await runMigrations({});
  return response.status(200).json(migratedMigrations);
}

async function postMigrationsHandle(request, response) {
  const { migratedMigrations } = await runMigrations({ dryRun: false });
  const status_code = migratedMigrations.length > 0 ? 201 : 200;
  return response.status(status_code).json(migratedMigrations);
}

async function runMigrations({ dryRun = true }) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    const migratedMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient?.end();

    return { migratedMigrations };
  } catch (error) {
    await dbClient?.end();
    console.error(error);
  }
}
