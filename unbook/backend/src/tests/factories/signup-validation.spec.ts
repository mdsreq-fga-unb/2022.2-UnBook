import { makeSignUpValidator } from "../../main/factories/signup-validation";
import { CompareFieldsValidation } from "../../presentation/helpers/validators/CompareFieldsValidation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/RequiredFieldValidation";
import { ValidationComposite } from "../../presentation/helpers/validators/ValidationComposite";

jest.mock("../../presentation/helpers/validators/ValidationComposite");

describe("SignUpValidation Factory", () => {
  test("Deve chamar o ValidationComposite com todas as validações", async () => {
    makeSignUpValidator();
    const validations = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
