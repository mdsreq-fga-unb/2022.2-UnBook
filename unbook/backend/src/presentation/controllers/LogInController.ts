import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest } from "../helpers/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IEmailValidator } from "../protocols/signup-protocols";

class LoginController implements IController {
  constructor(private readonly emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("email")))
      );
    }
    if (!httpRequest.body.password) {
      return new Promise((resolve) =>
        resolve(badRequest(new MissingParamError("password")))
      );
    }
    const isValid = this.emailValidator.isValid(httpRequest.body.email);
    if (!isValid) {
      return new Promise((resolve) =>
        resolve(badRequest(new InvalidParamError("email")))
      );
    }
    return new Promise((resolve) =>
      resolve(badRequest(new MissingParamError("email")))
    );
  }
}

export { LoginController };
