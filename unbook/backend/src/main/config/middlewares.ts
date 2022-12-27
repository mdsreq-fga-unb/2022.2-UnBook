import { Express } from "express";
import { bodyParser, contentType, cors } from "../middlewares/index";

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};

export { setupMiddlewares };
