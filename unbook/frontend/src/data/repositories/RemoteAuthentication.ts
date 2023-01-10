import { InvalidCredentialsError, UnexpectedError } from "../../domain/errors";
import { IAccountModel } from "../../domain/models/IAccountModel";
import {
	IAuthentication,
	IAuthenticationParams,
} from "../../domain/usecases/IAuthenticationUseCase";
import { IHttpPostClient } from "../protocols/http/index";
import { HttpStatusCode } from "../protocols/http/HttpResponse";

class RemoteAuthentication implements IAuthentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient<
			IAuthenticationParams,
			IAccountModel
		>
	) {}

	async auth(params: IAuthenticationParams): Promise<IAccountModel> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: params,
		});

		switch (httpResponse.statusCode) {
		case HttpStatusCode.ok:
			return httpResponse.body;
		case HttpStatusCode.unauthorized:
			throw new InvalidCredentialsError();
		default:
			throw new UnexpectedError();
		}
	}
}

export { RemoteAuthentication };
