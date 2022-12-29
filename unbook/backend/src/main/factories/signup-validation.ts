import { CompareFieldsValidation } from "../../presentation/helpers/validators/CompareFieldsValidation";
import { EmailValidation } from "../../presentation/helpers/validators/EmailValidation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/RequiredFieldValidation";
import { ValidationComposite } from "../../presentation/helpers/validators/ValidationComposite";
import { EmailValidatorAdapter } from "../../utils/EmailValidatorAdapter";

const makeSignUpValidator = (): ValidationComposite => {
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

export { makeSignUpValidator };
