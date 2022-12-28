import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../presentation/protocols";

class LogControllerDecorator implements IController {
  constructor(private readonly controller: IController) {
    this.controller = controller;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      // log
    }
    return httpResponse;
  }
}

export { LogControllerDecorator };
