import { Express } from "express";
import { bodyParser } from "../middlewares/body-parser";
import { cors } from "../middlewares/cors";

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
};

export { setupMiddlewares };
