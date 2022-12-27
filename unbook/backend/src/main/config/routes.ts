import { Express, Router } from "express";
import fg from "fast-glob";

const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  fg.sync(["**/src/main/routes/**routes.ts"]).map(async (file) => {
    (await import(`../../../${file}`)).default(router);
  });
};

export { setupRoutes };
