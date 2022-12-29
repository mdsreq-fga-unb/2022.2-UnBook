/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeSignUpValidation } from "../../../main/factories/signup/signup-validation";
import { CompareFieldsValidation } from "../../../presentation/helpers/validators/CompareFieldsValidation";
import { EmailValidation } from "../../../presentation/helpers/validators/EmailValidation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../presentation/helpers/validators/ValidationComposite";
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
