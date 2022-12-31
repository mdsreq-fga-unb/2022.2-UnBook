import { IHttpPostClient } from "../protocols/http/HttpPostClient";

class RemoteAuthentication {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient
	) {}

	async auth(): Promise<void> {
		await this.httpPostClient.post(this.url);
		return Promise.resolve();
	}
}

export { RemoteAuthentication };
