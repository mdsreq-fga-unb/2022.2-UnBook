import { LoginController } from "../../../../presentation/controllers/login/LogInController";
import { IController } from "../../../../presentation/protocols/signup-protocols";
import { makeDbAuthentication } from "../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../usecases/decorators/log-controller-decorator-factory";
import { makeLogInValidation } from "./login-validation-factory";

const makeLogInController = (): IController => {
  return makeLogControllerDecorator(
    new LoginController(makeDbAuthentication(), makeLogInValidation())
  );
};
export { makeLogInController };
