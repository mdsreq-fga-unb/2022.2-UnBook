interface IHttpPostClient {
	post(url: string): Promise<void>;
}

export { IHttpPostClient };
