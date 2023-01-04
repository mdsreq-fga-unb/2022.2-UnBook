import { IAccountModel } from "../../../../domain/models/IAccountModel";
import {
	IAuthentication,
	IAuthenticationParams,
} from "../../../../domain/usecases/IAuthenticationUseCase";
import { mockAccountModel } from "../../../mocks";

class AuthenticationSpy implements IAuthentication {
	account = mockAccountModel();
	params: IAuthenticationParams;
	async auth(params: IAuthenticationParams): Promise<IAccountModel> {
		this.params = params;
		return Promise.resolve(this.account);
	}
}

export { AuthenticationSpy };
