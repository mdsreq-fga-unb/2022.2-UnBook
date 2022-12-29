/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeLogInValidation } from "../../../main/factories/login/login-validation";
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../presentation/helpers/validators";
import { IEmailValidator } from "../../../presentation/protocols/signup-protocols";

jest.mock("../../../presentation/helpers/validators/ValidationComposite");
const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("LoginValidation Factory", () => {
  test("Deve chamar o ValidationComposite com todas as validações", async () => {
    makeLogInValidation();
    const validations = [];
    for (const field of ["email", "password"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
