import { AddAccountRepository } from "../../database/repositories/AddAccountRepository";
import { BcryptAdapter } from "../../infra/criptography/BcryptAdapter";
import { AccountMongoRepository } from "../../infra/database/mongodb/repositories/AccountMongoRepository";
import { LogMongoRepository } from "../../infra/database/mongodb/repositories/LogMongoRepository";
import { SignUpController } from "../../presentation/controllers/SingUpController";
import { IController } from "../../presentation/protocols";
import { EmailValidatorAdapter } from "../../utils/EmailValidatorAdapter";
import { LogControllerDecorator } from "../decorators/LogControllerDecorator";

const makeSignUpController = (): IController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const logMongoRepository = new LogMongoRepository();
  const addAccountRepository = new AddAccountRepository(
    bcryptAdapter,
    accountMongoRepository
  );
  const sigupController = new SignUpController(
    emailValidatorAdapter,
    addAccountRepository
  );

  return new LogControllerDecorator(sigupController, logMongoRepository);
};

export { makeSignUpController };
