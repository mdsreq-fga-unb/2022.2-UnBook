import {
	HttpPostParams,
	IHttpPostClient,
} from "../../database/protocols/http/HttpPostClient";
import {
	HttpResponse,
	HttpStatusCode,
} from "../../database/protocols/http/HttpResponse";

class HttpPostClientSpy implements IHttpPostClient {
	url?: string;
	body?: object;
	response: HttpResponse = {
		statusCode: HttpStatusCode.ok,
	};
	async post(params: HttpPostParams): Promise<HttpResponse> {
		this.url = params.url;
		this.body = params.body;
		return Promise.resolve(this.response);
	}
}

export { HttpPostClientSpy };
