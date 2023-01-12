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
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
const data_sign_up_protocols_1 = require("../../../../src/data/protocols/database/account/data-sign-up-protocols");
const makeFakeAccount = () => {
    return {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "hashed_password",
    };
};
const makeAccountData = () => {
    return {
        name: "valid_name",
        email: "valid_email@mail.com",
        password: "valid_password",
    };
};
const makeEmcrypter = () => {
    class HasherStub {
        hash(value) {
            return new Promise((resolve) => resolve("hashed_password"));
        }
    }
    return new HasherStub();
};
const makeAddAccountRepository = () => {
    class AddAccountRepositoryStub {
        add(account) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakeAccount()));
            });
        }
    }
    return new AddAccountRepositoryStub();
};
const makeLoadAccountByEmailRepository = () => {
    class LoadAccountByEmailRepositoryStub {
        loadByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(null));
            });
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};
const makeSut = () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const hasherStub = makeEmcrypter();
    const addAccountRepositoryStub = makeAddAccountRepository();
    const sut = new data_sign_up_protocols_1.AddAccountRepository(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub);
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub,
    };
};
describe("AddAccount Repository UseCase", () => {
    test("Deve chamar o Hasher com o password correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hasherStub } = makeSut();
        const hasherSpy = jest.spyOn(hasherStub, "hash");
        yield sut.add(makeAccountData());
        expect(hasherSpy).toHaveBeenCalledWith("valid_password");
    }));
    test("Deve lançar um erro se Hasher falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hasherStub } = makeSut();
        jest
            .spyOn(hasherStub, "hash")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.add(makeAccountData());
        yield expect(promise).rejects.toThrow();
    }));
    test("Deve chamar o AddAccountRepository com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
        yield sut.add(makeAccountData());
        expect(addSpy).toHaveBeenCalledWith({
            name: "valid_name",
            email: "valid_email@mail.com",
            password: "hashed_password",
        });
    }));
    test("Deve lançar um erro se AddAccountRepository falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addAccountRepositoryStub } = makeSut();
        jest
            .spyOn(addAccountRepositoryStub, "add")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.add(makeAccountData());
        yield expect(promise).rejects.toThrow();
    }));
    test("Deve retornar uma account quando for enviado os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const account = yield sut.add(makeAccountData());
        expect(account).toEqual(makeFakeAccount());
    }));
    test("Deve retornar null se o LoadAccountByEmailRepository não retornar null", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
            .mockReturnValueOnce(new Promise((resolve) => resolve(makeFakeAccount())));
        const account = yield sut.add(makeAccountData());
        expect(account).toBeNull();
    }));
    test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");
        yield sut.add(makeAccountData());
        expect(loadSpy).toHaveBeenLastCalledWith("valid_email@mail.com");
    }));
});
