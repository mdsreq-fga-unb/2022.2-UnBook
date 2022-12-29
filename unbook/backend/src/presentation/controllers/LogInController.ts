import { IAuthentication } from "../../domain/usecases/IAuthentication";
import { InvalidParamError, MissingParamError } from "../errors";
import {
  badRequest,
  ok,
  serverError,
  unauthorized,
} from "../helpers/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IEmailValidator } from "../protocols/signup-protocols";

class LoginController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly authentication: IAuthentication
  ) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ["email", "password"];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, password } = httpRequest.body;
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
      const accessToken = await this.authentication.auth(email, password);
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
