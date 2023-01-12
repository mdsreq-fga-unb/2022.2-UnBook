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
const LoadAccountByTokenRepository_1 = require("../../../../src/data/repositories/LoadAccountByTokenRepository");
const makeDecrypter = () => {
    class DecrypterStub {
        decrypt(value) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve("any_value"));
            });
        }
    }
    return new DecrypterStub();
};
const makeFakeAccount = () => {
    return {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "hashed_password",
    };
};
const makeLoadAccountByTokenRepository = () => {
    class LoadAccountByTokenRepositoryStub {
        loadByToken(token) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakeAccount()));
            });
        }
    }
    return new LoadAccountByTokenRepositoryStub();
};
const makeSut = () => {
    const decrypterStub = makeDecrypter();
    const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
    const sut = new LoadAccountByTokenRepository_1.LoadAccountByTokenRepository(decrypterStub, loadAccountByTokenRepositoryStub);
    return {
        sut,
        decrypterStub,
        loadAccountByTokenRepositoryStub,
    };
};
describe("LoadAccountByTokenRepository", () => {
    test("Deve chamar o decrypter com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, decrypterStub } = makeSut();
        const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
        yield sut.load("any_token");
        expect(decryptSpy).toHaveBeenCalledWith("any_token");
    }));
    test("Deve chamar null se o decrypter retornar null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, decrypterStub } = makeSut();
        jest
            .spyOn(decrypterStub, "decrypt")
            .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
        const account = yield sut.load("any_token");
        expect(account).toBeNull();
    }));
    test("Deve chamar o LoadAccountByTokenRepository com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut();
        const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, "loadByToken");
        yield sut.load("any_token");
        expect(loadByTokenSpy).toHaveBeenCalledWith("any_token");
    }));
    test("Deve retornar null se o LoadAccountByTokenRepository retornar null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut();
        jest
            .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
            .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
        const account = yield sut.load("any_token");
        expect(account).toBeNull();
    }));
    test("Deve retornar um account se tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const account = yield sut.load("any_token");
        expect(account).toEqual(makeFakeAccount());
    }));
    test("Deve lançar um erro se o Decrypter falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, decrypterStub } = makeSut();
        jest
            .spyOn(decrypterStub, "decrypt")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.load("any_token");
        yield expect(promise).rejects.toThrow();
    }));
    test("Deve lançar um erro se o LoadAccountByTokenRepository falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByTokenRepositoryStub } = makeSut();
        jest
            .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.load("any_token");
        yield expect(promise).rejects.toThrow();
    }));
});
