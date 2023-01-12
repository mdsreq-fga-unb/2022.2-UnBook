"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const errors_1 = require("../../../../src/presentation/errors");
const ValidationComposite_1 = require("../../../../src/validation/validators/ValidationComposite");
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return undefined;
        }
    }
    return new ValidationStub();
};
const makeSut = () => {
    const validationStubs = [makeValidation(), makeValidation()];
    const sut = new ValidationComposite_1.ValidationComposite(validationStubs);
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
            .mockReturnValueOnce(new errors_1.MissingParamError("field"));
        const error = sut.validate({ field: "any_value" });
        expect(error).toEqual(new errors_1.MissingParamError("field"));
    });
    test("Deve retornar o primeiro se tiver mais de um erro de validação", () => {
        const { sut, validationStubs } = makeSut();
        jest.spyOn(validationStubs[0], "validate").mockReturnValueOnce(new Error());
        jest
            .spyOn(validationStubs[1], "validate")
            .mockReturnValueOnce(new errors_1.MissingParamError("field"));
        const error = sut.validate({ field: "any_value" });
        expect(error).toEqual(new Error());
    });
    test("Não deve retornar nenhum erro se a validação tiver sucesso", () => {
        const { sut } = makeSut();
        const error = sut.validate({ field: "any_value" });
        expect(error).toBeFalsy();
    });
});
