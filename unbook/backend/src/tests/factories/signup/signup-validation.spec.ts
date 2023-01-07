/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeSignUpValidation } from "../../../main/factories/controllers/signup/signup-validation-factory";
import {
  EmailValidation,
  CompareFieldsValidation,
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

describe("SignUpValidation Factory", () => {
  test("Deve chamar o ValidationComposite com todas as validações", async () => {
    makeSignUpValidation();
    const validations = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    validations.push(new EmailValidation("email", makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
