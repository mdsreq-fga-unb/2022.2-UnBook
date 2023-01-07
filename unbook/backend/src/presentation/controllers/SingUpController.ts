import { IAuthentication } from "../../domain/usecases/IAuthenticationUseCase";
import { EmailInUseError } from "../errors/email-in-use-error";
import {
  badRequest,
  forbidden,
  ok,
  serverError,
} from "../helpers/http/http-helper";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IAddAccount,
  IValidation,
} from "../protocols/signup-protocols";

class SignUpController implements IController {
  constructor(
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {
    this.addAccount = addAccount;
    this.validation = validation;
    this.authentication = authentication;
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!account) {
        return forbidden(new EmailInUseError());
      }
      const accessToken = await this.authentication.auth({
        email,
        password,
      });
      return ok({ accessToken });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export { SignUpController };
