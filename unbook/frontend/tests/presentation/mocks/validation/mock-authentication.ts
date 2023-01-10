import { IAccountModel } from "../../../../src/domain/models/IAccountModel";
import {
	IAuthentication,
	IAuthenticationParams,
} from "../../../../src/domain/usecases/IAuthenticationUseCase";
import { mockAccountModel } from "../../../mocks";

class AuthenticationSpy implements IAuthentication {
	account = mockAccountModel();
	params: IAuthenticationParams;
	callsCount = 0;
	async auth(params: IAuthenticationParams): Promise<IAccountModel> {
		this.params = params;
		this.callsCount++;
		return Promise.resolve(this.account);
	}
}

export { AuthenticationSpy };
