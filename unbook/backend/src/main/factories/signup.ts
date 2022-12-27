import { AddAccountRepository } from "../../database/repositories/AddAccountRepository";
import { BcryptAdapter } from "../../infra/criptography/BcryptAdapter";
import { AccountMongoRepository } from "../../infra/database/mongodb/repositories/AccountMongoRepository";
import { SignUpController } from "../../presentation/controllers/SingUpController";
import { EmailValidatorAdapter } from "../../utils/EmailValidatorAdapter";

const makeSignUpController = (): SignUpController => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const addAccountRepository = new AddAccountRepository(
    bcryptAdapter,
    accountMongoRepository
  );
  return new SignUpController(emailValidatorAdapter, addAccountRepository);
};

export { makeSignUpController };
