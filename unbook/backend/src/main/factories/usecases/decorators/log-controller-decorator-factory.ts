import { LogMongoRepository } from "../../../../infra/database/mongodb/repositories/log/LogMongoRepository";
import { IController } from "../../../../presentation/protocols";
import { LogControllerDecorator } from "../../../decorators/LogControllerDecorator";

const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
export { makeLogControllerDecorator };
