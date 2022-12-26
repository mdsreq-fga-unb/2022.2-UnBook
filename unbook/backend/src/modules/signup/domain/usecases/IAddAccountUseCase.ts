import { IAccountModel } from "../models/AccountModel";

interface IAddAccountModel {
  name: string;
  email: string;
  password: string;
}

interface IAddAccount {
  add(account: IAddAccountModel): IAccountModel;
}

export { IAddAccountModel, IAddAccount };
