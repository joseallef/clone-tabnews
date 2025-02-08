import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import migrator from "models/migrator.js";

const router = createRouter();

router.get(getMigrationsHandle).post(postMigrationsHandle);

export default router.handler(controller.onErrorHandlers);

async function getMigrationsHandle(request, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postMigrationsHandle(request, response) {
  const pendingMigrations = await migrator.runPendingMigrations();
  const status_code = pendingMigrations.length > 0 ? 201 : 200;
  return response.status(status_code).json(pendingMigrations);
}
