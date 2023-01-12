import {
	HttpPostParams,
	HttpResponse,
	IHttpPostClient,
} from "../../data/protocols/http";
import axios, { AxiosResponse } from "axios";

class AxiosHttpClient
implements IHttpPostClient<HttpPostParams<any>, HttpResponse<any>>
{
	async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
		let httpResponse: AxiosResponse<any>;
		try {
			httpResponse = await axios.post(params.url, params.body);
		} catch (error) {
			httpResponse = error.response;
		}
		return {
			statusCode: httpResponse.status,
			body: httpResponse.data,
		};
	}
}

export { AxiosHttpClient };
