import { AddAccountRepository } from "../../../../data/repositories/AddAccountRepository";
import { IAddAccount } from "../../../../domain/usecases/IAddAccountUseCase";
import { BcryptAdapter } from "../../../../infra/criptography/BcryptAdapter";
import { AccountMongoRepository } from "../../../../infra/database/mongodb/repositories/AccountMongoRepository";

const makeDbAddAccount = (): IAddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const loadAccountByEmailRepository = new LoadAccountByEmailRepository();
  return new AddAccountRepository(bcryptAdapter, accountMongoRepository);
};
export { makeDbAddAccount };
