import { faker } from "@faker-js/faker";
import {
	HttpPostParams,
	IHttpPostClient,
	HttpResponse,
	HttpStatusCode,
} from "../../../src/data/protocols/http";

const mockPostRequest = (): HttpPostParams<any> => ({
	url: faker.internet.url(),
	body: faker.helpers.objectValue({}),
});

class HttpPostClientSpy<T, R> implements IHttpPostClient<T, R> {
	url?: string;
	body?: T;
	response: HttpResponse<R> = {
		statusCode: HttpStatusCode.ok,
	};
	async post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
		this.url = params.url;
		this.body = params.body;
		return Promise.resolve(this.response);
	}
}

export { HttpPostClientSpy, mockPostRequest };
