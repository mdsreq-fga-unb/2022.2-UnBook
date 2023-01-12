"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../../src/presentation/errors");
const RequiredFieldValidation_1 = require("../../../../src/validation/validators/RequiredFieldValidation");
const makeSut = () => {
    return new RequiredFieldValidation_1.RequiredFieldValidation("any_field");
};
describe("Required Field Validation", () => {
    test("Deve retornar um MissingParamError se a validação falhar", () => {
        const sut = makeSut();
        const error = sut.validate({ name: "any_parameter" });
        expect(error).toEqual(new errors_1.MissingParamError("any_field"));
    });
    test("Não deve retornar nada se a validação tiver sucesso", () => {
        const sut = makeSut();
        const error = sut.validate({ any_field: "any_parameter" });
        expect(error).toBeFalsy();
    });
});
