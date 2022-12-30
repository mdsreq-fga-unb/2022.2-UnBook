import { AuthenticationRepository } from "../../../database/repositories/AuthenticationRepository";
import { BcryptAdapter } from "../../../infra/criptography/BcryptAdapter";
import { JWTAdapter } from "../../../infra/criptography/JWTAdapter";
import { AccountMongoRepository } from "../../../infra/database/mongodb/repositories/AccountMongoRepository";
import { LogMongoRepository } from "../../../infra/database/mongodb/repositories/LogMongoRepository";
import { LoginController } from "../../../presentation/controllers/LogInController";
import { IController } from "../../../presentation/protocols/signup-protocols";
import env from "../../config/env";
import { LogControllerDecorator } from "../../decorators/LogControllerDecorator";
import { makeLogInValidation } from "./login-validation-factory";

const makeLogInController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdpter = new JWTAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const authenticationRepository = new AuthenticationRepository(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdpter,
    accountMongoRepository
  );
  const loginController = new LoginController(
    authenticationRepository,
    makeLogInValidation()
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
export { makeLogInController };
