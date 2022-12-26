import {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IEncrypter,
} from "../../presentation/protocols/signup-protocols";

class DbAddAccount implements IAddAccount {
  constructor(private readonly encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }
  add(account: IAddAccountModel): Promise<IAccountModel> {
    this.encrypter.encrypt(account.password);
    const accountData = {
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    return new Promise((resolve) => resolve(accountData));
  }
}

export { DbAddAccount };
