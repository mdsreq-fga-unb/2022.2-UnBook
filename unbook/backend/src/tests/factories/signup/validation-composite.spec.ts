/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MissingParamError } from "../../../presentation/errors";
import { ValidationComposite } from "../../../presentation/helpers/validators/ValidationComposite";
import { IValidation } from "../../../presentation/protocols/signup-protocols";

interface ISubTypes {
  sut: ValidationComposite;
  validationStubs: IValidation[];
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
  const validationStubs = [makeValidation(), makeValidation()];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe("Validation Composite", () => {
  test("Deve retornar um erro se alguma validação falhar", () => {
    const { sut, validationStubs } = makeSut();
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new MissingParamError("field"));
  });

  test("Deve retornar o primeiro se tiver mais de um erro de validação", () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());
    jest
      .spyOn(validationStubs[1], "validate")
      .mockReturnValueOnce(new MissingParamError("field"));
    const error = sut.validate({ field: "any_value" });
    expect(error).toEqual(new Error());
  });

  test("Não deve retornar nenhum erro se a validação tiver sucesso", () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: "any_value" });
    expect(error).toBeFalsy();
  });
});
