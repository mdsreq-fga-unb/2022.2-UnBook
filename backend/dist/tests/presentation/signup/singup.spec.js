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
const SingUpController_1 = require("../../../src/presentation/controllers/signup/SingUpController");
const errors_1 = require("../../../src/presentation/errors");
const email_in_use_error_1 = require("../../../src/presentation/errors/email-in-use-error");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
const makeAuthentication = () => {
    class AuthenticationStub {
        auth(authentication) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve("any_token"));
            });
        }
    }
    return new AuthenticationStub();
};
const makeFakeRequest = () => {
    return {
        body: {
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
            passwordConfirmation: "any_password",
        },
    };
};
const makeFakeAccount = () => {
    return {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password",
    };
};
const makeAddAccount = () => {
    class AddAccountStub {
        add(account) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakeAccount()));
            });
        }
    }
    return new AddAccountStub();
};
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return undefined;
        }
    }
    return new ValidationStub();
};
const makeSut = () => {
    const authenticationStub = makeAuthentication();
    const addAccountStub = makeAddAccount();
    const validationStub = makeValidation();
    const sut = new SingUpController_1.SignUpController(addAccountStub, validationStub, authenticationStub);
    return {
        sut,
        addAccountStub,
        validationStub,
        authenticationStub,
    };
};
describe("SignUp Controller", () => {
    test("Deve chamar o AddAccount com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addAccountStub } = makeSut();
        const addSpy = jest.spyOn(addAccountStub, "add");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(addSpy).toHaveBeenCalledWith({
            name: "any_name",
            email: "any_email@mail.com",
            password: "any_password",
        });
    }));
    test("Deve retornar 500 se o AddAccount retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addAccountStub } = makeSut();
        const fakeError = new Error();
        fakeError.stack = "any_stack";
        jest.spyOn(addAccountStub, "add").mockImplementationOnce(() => {
            return new Promise((resolve, reject) => reject(new Error()));
        });
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new errors_1.ServerError("any_stack")));
        expect(httpResponse.statusCode).toBe(500);
        expect(httpResponse.body).toEqual(new errors_1.ServerError("any_stack"));
    }));
    test("Deve retornar 403 se o AddAccount retornar null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addAccountStub } = makeSut();
        jest
            .spyOn(addAccountStub, "add")
            .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.forbidden)(new email_in_use_error_1.EmailInUseError()));
    }));
    test("Deve retornar 200 os dados forem enviados corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpRequest = makeFakeRequest();
        const httpResponse = yield sut.handle(httpRequest);
        expect(httpResponse).toEqual((0, http_helper_1.ok)({
            accessToken: "any_token",
        }));
    }));
    test("Deve chamar o Validation com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    }));
    test("Should return 400 if Validation returns an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest
            .spyOn(validationStub, "validate")
            .mockReturnValueOnce(new errors_1.MissingParamError("any_field"));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.badRequest)(new errors_1.MissingParamError("any_field")));
    }));
    test("Deve chamar o Authentication com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        const authSpy = jest.spyOn(authenticationStub, "auth");
        yield sut.handle(makeFakeRequest());
        expect(authSpy).toHaveBeenCalledWith({
            email: "any_email@mail.com",
            password: "any_password",
        });
    }));
    test("Deve retornar 500 se o Authentication retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, "auth").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
});
