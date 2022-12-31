import { IAuthenticationParams } from "../../domain/usecases/IAuthenticationUseCase";
import { IHttpPostClient } from "../protocols/http/HttpPostClient";

class RemoteAuthentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient
	) {}

	async auth(params: IAuthenticationParams): Promise<void> {
		await this.httpPostClient.post({ url: this.url, body: params });
	}
}

export { RemoteAuthentication };
