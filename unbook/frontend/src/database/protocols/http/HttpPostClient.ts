type HttpPostParams = {
	url: string;
	body?: object;
};

interface IHttpPostClient {
	post(params: HttpPostParams): Promise<void>;
}

export { HttpPostParams, IHttpPostClient };
