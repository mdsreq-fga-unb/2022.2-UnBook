import { CompareFieldsValidation } from "../../presentation/helpers/validators/CompareFieldsValidation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/RequiredFieldValidation";
import { ValidationComposite } from "../../presentation/helpers/validators/ValidationComposite";

const makeSignUpValidator = (): ValidationComposite => {
  const validations = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  return new ValidationComposite(validations);
};

export { makeSignUpValidator };
