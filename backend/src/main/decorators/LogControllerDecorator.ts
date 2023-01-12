import { ILogErrorRepository } from "../../data/protocols/database/log/ILogErrorRepository";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../presentation/protocols";

class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {
    this.controller = controller;
    this.logErrorRepository = logErrorRepository;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}

export { LogControllerDecorator };
