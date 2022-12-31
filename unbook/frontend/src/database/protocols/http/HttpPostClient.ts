import { HttpResponse } from "./HttpResponse";

type HttpPostParams = {
	url: string;
	body?: object;
};

interface IHttpPostClient {
	post(params: HttpPostParams): Promise<HttpResponse>;
}

export { HttpPostParams, IHttpPostClient };
