import { IAccountModel } from "../models/AccountModel";

interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<IAccountModel>;
}

export { ILoadAccountByToken };
