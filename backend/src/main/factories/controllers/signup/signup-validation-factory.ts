import { EmailValidatorAdapter } from "../../../../infra/validators/EmailValidatorAdapter";
import {
  EmailValidation,
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../validation/validators";

const makeSignUpValidation = (): ValidationComposite => {
  const validations = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export { makeSignUpValidation };
