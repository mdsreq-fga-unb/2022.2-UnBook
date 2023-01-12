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
const LogInController_1 = require("../../../src/presentation/controllers/login/LogInController");
const errors_1 = require("../../../src/presentation/errors");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return undefined;
        }
    }
    return new ValidationStub();
};
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
const makeSut = () => {
    const authenticationStub = makeAuthentication();
    const validationStub = makeValidation();
    const sut = new LogInController_1.LoginController(authenticationStub, validationStub);
    return {
        sut,
        authenticationStub,
        validationStub,
    };
};
const makeFakeRequest = () => {
    return {
        body: {
            email: "any_email@mail.com",
            password: "any_password",
        },
    };
};
describe("SignUp Controller", () => {
    test("Deve chamar o Authentication com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        const authSpy = jest.spyOn(authenticationStub, "auth");
        yield sut.handle(makeFakeRequest());
        expect(authSpy).toHaveBeenCalledWith({
            email: "any_email@mail.com",
            password: "any_password",
        });
    }));
    test("Deve retornar 500 se o Authentication retonrar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, "auth").mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
    test("Deve retornar 200 os dados forem enviados corretamente", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.ok)({ accessToken: "any_token" }));
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
});
