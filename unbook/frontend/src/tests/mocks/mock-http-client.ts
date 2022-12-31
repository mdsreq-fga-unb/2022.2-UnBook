import { IHttpPostClient } from "../../database/protocols/http/HttpPostClient";

class HttpPostClientSpy implements IHttpPostClient {
	url?: string;
	async post(url: string): Promise<void> {
		this.url = url;
		return Promise.resolve();
	}
}

export { HttpPostClientSpy };
