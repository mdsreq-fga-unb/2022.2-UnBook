import {
	HttpPostParams,
	IHttpPostClient,
} from "../../database/protocols/http/HttpPostClient";

class HttpPostClientSpy implements IHttpPostClient {
	url?: string;
	body?: object;
	async post(params: HttpPostParams): Promise<void> {
		this.url = params.url;
		this.body = params.body;
		return Promise.resolve();
	}
}

export { HttpPostClientSpy };
