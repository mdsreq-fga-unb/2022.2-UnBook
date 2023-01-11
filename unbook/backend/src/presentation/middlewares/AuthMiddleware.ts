import { ILoadAccountByToken } from "../../domain/usecases/ILoadAccountByTokenUseCase";
import { AccessDeniedError } from "../errors/access-denied-error";
import { forbidden } from "../helpers/http/http-helper";
import { IHttpRequest, IHttpResponse } from "../protocols";
import { IMiddleware } from "../protocols/IMiddleware";

class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadAccountByToken: ILoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.["x-access-token"];
    if (accessToken) {
      await this.loadAccountByToken.load(accessToken);
    }
    const error = forbidden(new AccessDeniedError());
    return new Promise((resolve) => resolve(error));
  }
}

export { AuthMiddleware };
