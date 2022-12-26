import { IAccountModel } from "../models/AccountModel";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAccount {
  add(account: IAddAccountModel): Promise<IAccountModel>;
}

export { IAddAccountModel, IAddAccount };
