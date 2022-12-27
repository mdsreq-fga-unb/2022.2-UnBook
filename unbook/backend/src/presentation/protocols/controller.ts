import { IHttpRequest, IHttpResponse } from "./http";

interface IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

export { IController };
