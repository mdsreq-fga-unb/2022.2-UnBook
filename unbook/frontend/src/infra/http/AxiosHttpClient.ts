import {
	HttpPostParams,
	HttpResponse,
	IHttpPostClient,
} from "../../database/protocols/http";
import axios from "axios";

class AxiosHttpClient
implements IHttpPostClient<HttpPostParams<any>, HttpResponse<any>>
{
	async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
		const httpResponse = await axios.post(params.url, params.body);
		return {
			statusCode: httpResponse.status,
			body: httpResponse.data,
		};
	}
}

export { AxiosHttpClient };
