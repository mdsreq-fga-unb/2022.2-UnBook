import {
  ValidationComposite,
  RequiredFieldValidation,
} from "../../../../../validation/validators";

const makeAddPostValidation = (): ValidationComposite => {
  const validations = [];
  for (const field of ["content"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};

export { makeAddPostValidation };
