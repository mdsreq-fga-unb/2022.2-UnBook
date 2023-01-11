import { AccessDeniedError } from "../errors/access-denied-error";
import { forbidden } from "../helpers/http/http-helper";
import { IHttpRequest, IHttpResponse } from "../protocols";
import { IMiddleware } from "../protocols/IMiddleware";

class AuthMiddleware implements IMiddleware {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = forbidden(new AccessDeniedError());
    return new Promise((resolve) => resolve(error));
  }
}

export { AuthMiddleware };
