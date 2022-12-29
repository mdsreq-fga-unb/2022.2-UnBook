import { MissingParamError } from "../../presentation/errors";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/RequiredFieldValidation";

describe("Required Field Validation", () => {
  test("Deve retornar um MissingParamError se a validação falhar", () => {
    const sut = new RequiredFieldValidation("any_field");
    const error = sut.validate({ name: "any_parameter" });
    expect(error).toEqual(new MissingParamError("any_field"));
  });

  test("Não deve retornar nada se a validação tiver sucesso", () => {
    const sut = new RequiredFieldValidation("any_field");
    const error = sut.validate({ any_field: "any_parameter" });
    expect(error).toBeFalsy();
  });
});
