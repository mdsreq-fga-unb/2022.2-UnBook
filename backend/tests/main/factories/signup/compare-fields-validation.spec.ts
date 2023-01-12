import { InvalidParamError } from "../../../../src/presentation/errors";
import { CompareFieldsValidation } from "../../../../src/validation/validators/CompareFieldsValidation";

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation("field", "fieldToCompare");
};

describe("Required Field Validation", () => {
  test("Deve retornar um InvalidParamError se a validação falhar", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_parameter",
      fieldToCompare: "other_parameter",
    });
    expect(error).toEqual(new InvalidParamError("fieldToCompare"));
  });

  test("Não deve retornar nada se a validação tiver sucesso", () => {
    const sut = makeSut();
    const error = sut.validate({
      field: "any_parameter",
      fieldToCompare: "any_parameter",
    });
    expect(error).toBeFalsy();
  });
});
