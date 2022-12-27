import { Express } from "express";
import { bodyParser } from "../middlewares/body-parser";

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
};

export { setupMiddlewares };
