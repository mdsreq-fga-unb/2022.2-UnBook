/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from "../../presentation/errors";
import { ValidationComposite } from "../../presentation/helpers/validators/ValidationComposite";

describe("Validation Composite", () => {
  test("Deve retornar um erro se alguma validação falhar", () => {
    class ValidationStub {
      validate(input: any): Error {
        return new MissingParamError("field");
      }
    }
    const validationStub = new ValidationStub();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new MissingParamError("field"));
  });
});
