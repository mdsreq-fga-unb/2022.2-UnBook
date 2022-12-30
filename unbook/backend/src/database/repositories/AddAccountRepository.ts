/* eslint-disable import/extensions */
import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";
import { IHasher } from "../protocols/database/data-sign-up-protocols";

class AddAccountRepository implements IAddAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly addAccountRepository: IAddAccount
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign(accountData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(account));
  }
}

export { AddAccountRepository };
