import { IAccountModel } from "../../../../src/domain/models/IAccountModel";
import {
	IAddAccount,
	IAddAccountParams,
} from "../../../../src/domain/usecases/IAddAccountUseCase";
import { mockAccountModel } from "../../../mocks";

class AddAccountSpy implements IAddAccount {
	account = mockAccountModel();
	params: IAddAccountParams;
	async add(params: IAddAccountParams): Promise<IAccountModel> {
		this.params = params;
		return Promise.resolve(this.account);
	}
}

export { AddAccountSpy };
