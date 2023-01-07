import { MissingParamError } from "../../../src/presentation/errors";
import { RequiredFieldValidation } from "../../../src/presentation/helpers/validators/RequiredFieldValidation";

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation("any_field");
};

describe("Required Field Validation", () => {
  test("Deve retornar um MissingParamError se a validação falhar", () => {
    const sut = makeSut();
    const error = sut.validate({ name: "any_parameter" });
    expect(error).toEqual(new MissingParamError("any_field"));
  });

  test("Não deve retornar nada se a validação tiver sucesso", () => {
    const sut = makeSut();
    const error = sut.validate({ any_field: "any_parameter" });
    expect(error).toBeFalsy();
  });
});
