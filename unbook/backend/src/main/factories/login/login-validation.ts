import { EmailValidation } from "../../../presentation/helpers/validators/EmailValidation";
import { RequiredFieldValidation } from "../../../presentation/helpers/validators/RequiredFieldValidation";
import { ValidationComposite } from "../../../presentation/helpers/validators/ValidationComposite";
import { EmailValidatorAdapter } from "../../../utils/EmailValidatorAdapter";

const makeLogInValidation = (): ValidationComposite => {
  const validations = [];
  for (const field of ["email", "password"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation("email", new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};

export { makeLogInValidation };
