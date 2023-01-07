/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeSignUpValidation } from "../../../src/main/factories/controllers/signup/signup-validation-factory";
import {
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../src/presentation/helpers/validators";
import { IEmailValidator } from "../../../src/presentation/protocols/signup-protocols";

jest.mock("../../../src/presentation/helpers/validators/ValidationComposite");
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
