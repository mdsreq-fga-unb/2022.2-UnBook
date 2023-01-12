import { IAccountModel } from "../models/IAccountModel";

interface IAddAccountParams {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface IAddAccount {
	add(authentication: IAddAccountParams): Promise<IAccountModel>;
}

export { IAddAccount, IAddAccountParams };
