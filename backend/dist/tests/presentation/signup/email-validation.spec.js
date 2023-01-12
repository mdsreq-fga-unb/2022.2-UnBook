"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
const errors_1 = require("../../../src/presentation/errors");
const EmailValidation_1 = require("../../../src/validation/validators/EmailValidation");
const makeEmailValidator = () => {
    class EmailValidatorStub {
        isValid(email) {
            return true;
        }
    }
    return new EmailValidatorStub();
};
const makeSut = () => {
    const emailValidatorStub = makeEmailValidator();
    const sut = new EmailValidation_1.EmailValidation("email", emailValidatorStub);
    return {
        sut,
        emailValidatorStub,
    };
};
describe("Email Validation", () => {
    test("Deve retornar um erro se o EmailValidator retornar falso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
        const error = sut.validate({ email: "any_email@mail.com" });
        expect(error).toEqual(new errors_1.InvalidParamError("email"));
    }));
    test("Deve chamar o EmailValidator com o email correto", () => {
        const { sut, emailValidatorStub } = makeSut();
        const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
        sut.validate({ email: "any_email@mail.com" });
        expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
    });
    test("Deve retornar um erro se o EmailValidator retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, emailValidatorStub } = makeSut();
        jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
            throw new Error();
        });
        expect(sut.validate).toThrow();
    }));
});
