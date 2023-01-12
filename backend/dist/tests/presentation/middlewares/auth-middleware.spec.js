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
const access_denied_error_1 = require("../../../src/presentation/errors/access-denied-error");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
const AuthMiddleware_1 = require("../../../src/presentation/middlewares/AuthMiddleware");
const makeFakeRequest = () => {
    return {
        headers: {
            "x-access-token": "any_token",
        },
    };
};
const makeFakeAccount = () => {
    return {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "hashed_password",
    };
};
const makeLoadAccountByToken = () => {
    class LoadAccountByTokenStub {
        load(accessToken, role) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakeAccount()));
            });
        }
    }
    return new LoadAccountByTokenStub();
};
const makeSut = () => {
    const loadAccountByTokenStub = makeLoadAccountByToken();
    const sut = new AuthMiddleware_1.AuthMiddleware(loadAccountByTokenStub);
    return {
        sut,
        loadAccountByTokenStub,
    };
};
describe("Auth Middleware", () => {
    test("Deve retornar 403 se o accessToken não for encontrdo no headers", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle({});
        expect(httpResponse).toEqual((0, http_helper_1.forbidden)(new access_denied_error_1.AccessDeniedError()));
    }));
    test("Deve chamar o LoadAccountByToken com o accessToken correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");
        yield sut.handle(makeFakeRequest());
        expect(loadSpy).toHaveBeenCalledWith("any_token");
    }));
    test("Deve retornar 403 se o LoadAccountByToken retornar null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenStub } = makeSut();
        jest
            .spyOn(loadAccountByTokenStub, "load")
            .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.forbidden)(new access_denied_error_1.AccessDeniedError()));
    }));
    test("Deve retornar 200 se o LoadAccountBuToken retornar uma conta", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenStub } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.ok)({ accountId: "valid_id" }));
    }));
    test("Deve retornar 500 se o LoadAccountBuToken lançar erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenStub } = makeSut();
        jest
            .spyOn(loadAccountByTokenStub, "load")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
});
