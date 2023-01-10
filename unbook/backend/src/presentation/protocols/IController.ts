import { IHttpRequest, IHttpResponse } from "./IHttp";

interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

export { IController };
