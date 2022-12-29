/* eslint-disable import/extensions */
import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";
import { IEncrypter } from "../protocols/database/data-sign-up-protocols";

class AddAccountRepository implements IAddAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccount
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.addAccountRepository.add(
      Object.assign(accountData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(account));
  }
}

export { AddAccountRepository };
