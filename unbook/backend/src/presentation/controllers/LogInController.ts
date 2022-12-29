import { MissingParamError } from "../errors";
import { badRequest } from "../helpers/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";

class LoginController implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return new Promise((resolve) =>
      resolve(badRequest(new MissingParamError("email")))
    );
  }
}

export { LoginController };
