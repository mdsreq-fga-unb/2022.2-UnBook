import { makeSignUpValidator } from "../../main/factories/signup-validation";
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
