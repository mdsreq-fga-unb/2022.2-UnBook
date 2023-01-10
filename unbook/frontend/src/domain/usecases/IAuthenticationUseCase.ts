import { IAccountModel } from "../models/IAccountModel";

interface IAuthenticationParams {
	email: string;
	password: string;
}
interface IAuthentication {
	auth(authentication: IAuthenticationParams): Promise<IAccountModel>;
}

export { IAuthentication, IAuthenticationParams };
