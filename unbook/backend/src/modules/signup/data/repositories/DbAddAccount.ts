import {
  IAddAccount,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";
import { IEncrypter } from "../protocols/encrypter";

class DbAddAccount implements IAddAccount {
  constructor(private readonly encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }
  add(account: IAddAccountModel): any {
    this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}

export { DbAddAccount };
