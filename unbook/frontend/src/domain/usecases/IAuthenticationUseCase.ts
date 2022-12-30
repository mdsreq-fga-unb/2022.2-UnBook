import { IAccountModel } from '../models/AccountModel';

interface IAuthenticationModel {
  email: string;
  password: string;
}
interface IAuthentication {
  auth(authentication: IAuthenticationModel): Promise<IAccountModel>;
}

export { IAuthentication, IAuthenticationModel };
