"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const EmailValidatorAdapter_1 = require("../../../src/infra/validators/EmailValidatorAdapter");
jest.mock("validator", () => {
    return {
        isEmail() {
            return true;
        },
    };
});
const makeSut = () => {
    return new EmailValidatorAdapter_1.EmailValidatorAdapter();
};
describe("EmailValidator Adapter", () => {
    test("Deve retornar falso se a validação de email retornar falso", () => {
        const sut = makeSut();
        jest.spyOn(validator_1.default, "isEmail").mockReturnValueOnce(false);
        const isValid = sut.isValid("invalid_email@mail.com");
        expect(isValid).toBe(false);
    });
    test("Deve retornar verdadeiro se a validação de email retornar verdadeiro", () => {
        const sut = makeSut();
        const isValid = sut.isValid("any_email@aluno.unb.br");
        expect(isValid).toBe(true);
    });
    test("Deve retornar falso se o email enviado não possuir o domínio @aluno.unb.br", () => {
        const sut = makeSut();
        const isValid = sut.isValid("any_email@mail.com");
        expect(isValid).toBe(false);
    });
    test("Deve chamar o email validator com um email correto", () => {
        const sut = makeSut();
        const isEmailSpy = jest.spyOn(validator_1.default, "isEmail");
        sut.isValid("any_email@mail.com");
        expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
    });
});
