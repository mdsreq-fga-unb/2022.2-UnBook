/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeAddPostValidation } from "../../../../src/main/factories/controllers/posts/add-post-validation-factory";
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from "../../../../src/validation/validators";

jest.mock("../../../../src/validation/validators/ValidationComposite");

describe("AddPostValidation Factory", () => {
  test("Deve chamar o ValidationComposite com todas as validações", async () => {
    makeAddPostValidation();
    const validations = [];
    for (const field of ["content"]) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
