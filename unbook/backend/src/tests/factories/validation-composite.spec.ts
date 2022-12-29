/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from "../../presentation/errors";
import { ValidationComposite } from "../../presentation/helpers/validators/ValidationComposite";
import { IValidation } from "../../presentation/protocols/signup-protocols";

interface ISubTypes {
  sut: ValidationComposite;
  validationStub: IValidation;
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error | undefined {
      return undefined;
    }
  }
  return new ValidationStub();
};

const makeSut = (): ISubTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub,
  };
};

describe("Validation Composite", () => {
  test("Deve retornar um erro se alguma validação falhar", () => {
    const { sut, validationStub } = makeSut();
    jest
      .spyOn(validationStub, "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new MissingParamError("field"));
  });
});
