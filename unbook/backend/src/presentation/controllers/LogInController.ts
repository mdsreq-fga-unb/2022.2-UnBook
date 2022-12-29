import { IAuthentication } from "../../domain/usecases/IAuthentication";
import { InvalidParamError, MissingParamError, ServerError } from "../errors";
import { badRequest, serverError } from "../helpers/http-helper";
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
      const { email, password } = httpRequest.body;
      if (!email) {
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError("email")))
        );
      }
      if (!password) {
        return new Promise((resolve) =>
          resolve(badRequest(new MissingParamError("password")))
        );
      }
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError("email")))
        );
      }
      await this.authentication.auth(email, password);
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("email")))
      );
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export { LoginController };
