import { HttpResponse } from "./HttpResponse";

type HttpPostParams<T> = {
	url: string;
	body?: T;
};

interface IHttpPostClient<T, R> {
	post(params: HttpPostParams<T>): Promise<HttpResponse<R>>;
}

export { HttpPostParams, IHttpPostClient };
