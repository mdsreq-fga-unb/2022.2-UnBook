import { EmailValidatorAdapter } from "../../../../infra/validators/EmailValidatorAdapter";
import {
  EmailValidation,
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../../validation/validators";

const makeLogInValidation = (): ValidationComposite => {
  const validations = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export { makeLogInValidation };
