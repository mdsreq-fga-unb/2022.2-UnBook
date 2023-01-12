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
const AuthenticationRepository_1 = require("../../../../src/data/repositories/AuthenticationRepository");
const makeFackAccount = () => {
    return {
        id: "any_id",
        name: "any_name",
        email: "any_email@mail.com",
        password: "hashed_password",
    };
};
const makeLoadAccountByEmailRepository = () => {
    class LoadAccountByEmailRepositoryStub {
        loadByEmail(email) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFackAccount()));
            });
        }
    }
    return new LoadAccountByEmailRepositoryStub();
};
const makeFakeAuthentication = () => {
    return {
        email: "any_email@mail.com",
        password: "any_password",
    };
};
const makeHashComparer = () => {
    class HashComparerStub {
        compare(value, hash) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(true));
            });
        }
    }
    return new HashComparerStub();
};
const makeEncrypter = () => {
    class EncrypterStub {
        encrypt(id) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve("any_token"));
            });
        }
    }
    return new EncrypterStub();
};
const makeUpdateAccessTokenRepository = () => {
    class UpdateAcessTokenRepositoryStub {
        updateAcessToken(id, token) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve());
            });
        }
    }
    return new UpdateAcessTokenRepositoryStub();
};
const makeSut = () => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
    const hashComparerStub = makeHashComparer();
    const encrypterStub = makeEncrypter();
    const updtadeAcessTokenRepositoryStub = makeUpdateAccessTokenRepository();
    const sut = new AuthenticationRepository_1.AuthenticationRepository(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updtadeAcessTokenRepositoryStub);
    return {
        sut,
        loadAccountByEmailRepositoryStub,
        hashComparerStub,
        encrypterStub,
        updtadeAcessTokenRepositoryStub,
    };
};
describe("Authentication Repository", () => {
    test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");
        yield sut.auth(makeFakeAuthentication());
        expect(loadSpy).toHaveBeenLastCalledWith("any_email@mail.com");
    }));
    test("Deve lançar um erro se o LoadAccountByEmailRepository lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut();
        jest
            .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        yield expect(promise).rejects.toThrow();
    }));
    // test.skip("Deve retornar null se LoadAccountByEmailRepository retornar null", async () => {
    //   const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    //   jest
    //     .spyOn(loadAccountByEmailRepositoryStub, "loadByEmail")
    //     .mockImplementationOnce(() => {
    //       return new Promise((resolve, reject) => resolve());
    //     });
    //   const acessToken = await sut.auth(makeFakeAuthentication());
    //   expect(acessToken).toBeNull();
    // });
    test("Deve chamar o HashComparer com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        const compareSpy = jest.spyOn(hashComparerStub, "compare");
        yield sut.auth(makeFakeAuthentication());
        expect(compareSpy).toHaveBeenLastCalledWith("any_password", "hashed_password");
    }));
    test("Deve lançar um erro se o HashComparer lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        jest
            .spyOn(hashComparerStub, "compare")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        yield expect(promise).rejects.toThrow();
    }));
    test("Deve retornar null se HashComparer retornar false", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, hashComparerStub } = makeSut();
        jest
            .spyOn(hashComparerStub, "compare")
            .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
        const acessToken = yield sut.auth(makeFakeAuthentication());
        expect(acessToken).toBeNull();
    }));
    test("Deve chamar o Encrypter com o id correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, encrypterStub } = makeSut();
        const generateSpy = jest.spyOn(encrypterStub, "encrypt");
        yield sut.auth(makeFakeAuthentication());
        expect(generateSpy).toHaveBeenLastCalledWith("any_id");
    }));
    test("Deve lançar um erro se o Encrypter lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, encrypterStub } = makeSut();
        jest
            .spyOn(encrypterStub, "encrypt")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        yield expect(promise).rejects.toThrow();
    }));
    test("Deve chamar o Encrypter com o id correto", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const acessToken = yield sut.auth(makeFakeAuthentication());
        expect(acessToken).toBe("any_token");
    }));
    test("Deve chamar o UpdateAcessTokenRepository com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
        const updateSpy = jest.spyOn(updtadeAcessTokenRepositoryStub, "updateAcessToken");
        yield sut.auth(makeFakeAuthentication());
        expect(updateSpy).toHaveBeenLastCalledWith("any_id", "any_token");
    }));
    test("Deve lançar um erro se o UpdateAcessTokenRepository lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
        jest
            .spyOn(updtadeAcessTokenRepositoryStub, "updateAcessToken")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.auth(makeFakeAuthentication());
        yield expect(promise).rejects.toThrow();
    }));
});
