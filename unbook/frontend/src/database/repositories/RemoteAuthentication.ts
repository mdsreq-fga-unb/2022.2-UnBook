import { InvalidCredentialsError } from "../../domain/errors/InvalidCredentialsError";
import { IAuthenticationParams } from "../../domain/usecases/IAuthenticationUseCase";
import { IHttpPostClient } from "../protocols/http/HttpPostClient";
import { HttpStatusCode } from "../protocols/http/HttpResponse";

class RemoteAuthentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient
	) {}

	async auth(params: IAuthenticationParams): Promise<void> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: params,
		});

		switch (httpResponse.statusCode) {
		case HttpStatusCode.unathorized:
			throw new InvalidCredentialsError();
		default:
			return Promise.resolve();
		}
	}
}

export { RemoteAuthentication };
