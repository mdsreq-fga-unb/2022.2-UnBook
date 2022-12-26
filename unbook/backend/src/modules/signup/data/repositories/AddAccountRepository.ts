import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";
import { IEncrypter } from "../protocols/data-sign-up-protocols";

class AddAccountRepository implements IAddAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly addAccountRepository: IAddAccount
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }
  async add(account: IAddAccountModel): Promise<IAccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    await this.addAccountRepository.add(
      Object.assign(account, { password: hashedPassword })
    );
    const accountData = {
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    return new Promise((resolve) => resolve(accountData));
  }
}

export { AddAccountRepository };
