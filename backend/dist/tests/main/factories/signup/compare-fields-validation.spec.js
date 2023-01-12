"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../../../src/presentation/errors");
const CompareFieldsValidation_1 = require("../../../../src/validation/validators/CompareFieldsValidation");
const makeSut = () => {
    return new CompareFieldsValidation_1.CompareFieldsValidation("field", "fieldToCompare");
};
describe("Required Field Validation", () => {
    test("Deve retornar um InvalidParamError se a validação falhar", () => {
        const sut = makeSut();
        const error = sut.validate({
            field: "any_parameter",
            fieldToCompare: "other_parameter",
        });
        expect(error).toEqual(new errors_1.InvalidParamError("fieldToCompare"));
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
