import { IHttpRequest, IHttpResponse } from "./http";

interface IController {
  handle(httpRequest: IHttpRequest): IHttpResponse;
}

export { IController };
