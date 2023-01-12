import { SignUpController } from "../../../../presentation/controllers/signup/SingUpController";
import { IController } from "../../../../presentation/protocols";
import { makeDbAddAccount } from "../../usecases/add-account/db-add-account-factory";
import { makeDbAuthentication } from "../../usecases/authentication/db-authentication-factory";
import { makeLogControllerDecorator } from "../../usecases/decorators/log-controller-decorator-factory";
import { makeSignUpValidation } from "./signup-validation-factory";

const makeSignUpController = (): IController => {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDbAddAccount(),
      makeSignUpValidation(),
      makeDbAuthentication()
    )
  );
};
export { makeSignUpController };
