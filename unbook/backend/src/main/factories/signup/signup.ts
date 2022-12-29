import { AddAccountRepository } from "../../../database/repositories/AddAccountRepository";
import { BcryptAdapter } from "../../../infra/criptography/BcryptAdapter";
import { AccountMongoRepository } from "../../../infra/database/mongodb/repositories/AccountMongoRepository";
import { LogMongoRepository } from "../../../infra/database/mongodb/repositories/LogMongoRepository";
import { SignUpController } from "../../../presentation/controllers/SingUpController";
import { IController } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decorators/LogControllerDecorator";
import { makeSignUpValidation } from "./signup-validation";

const makeSignUpController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const logMongoRepository = new LogMongoRepository();
  const addAccountRepository = new AddAccountRepository(
    bcryptAdapter,
    accountMongoRepository
  );
  const sigupController = new SignUpController(
    addAccountRepository,
    makeSignUpValidation()
  );

  return new LogControllerDecorator(sigupController, logMongoRepository);
};
export { makeSignUpController };
