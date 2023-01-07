/* eslint-disable import/extensions */
import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";
import { IHasher } from "../protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../protocols/database/ILoadAccountByEmailRepository";

class AddAccountRepository implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccount,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email);
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign(accountData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(account));
  }
}

export { AddAccountRepository };
