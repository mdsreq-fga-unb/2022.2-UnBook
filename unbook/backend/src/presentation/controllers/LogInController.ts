import { IAuthentication } from "../../domain/usecases/IAuthentication";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IValidation } from "../protocols/signup-protocols";

class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation
  ) {
    this.authentication = authentication;
    this.validation = validation;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      if (!accessToken) {
        return unauthorized();
      }
      return ok({ accessToken });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export { LoginController };
