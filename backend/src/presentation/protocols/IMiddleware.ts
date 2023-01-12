import { IHttpRequest, IHttpResponse } from "./IHttp";

interface IMiddleware {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

export { IMiddleware };
