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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const BcryptAdapter_1 = require("../../../src/infra/criptography/BcryptAdapter");
jest.mock("bcrypt", () => {
    return {
        hash() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve("hashed_password"));
            });
        },
        compare() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(true));
            });
        },
    };
});
const makeSut = () => {
    const salt = 12;
    return new BcryptAdapter_1.BcryptAdapter(salt);
};
describe("Bcrypt Adapter", () => {
    describe("hash()", () => {
        test("Deve chamar o hash com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const hashSpy = jest.spyOn(bcrypt_1.default, "hash");
            yield sut.hash("password");
            expect(hashSpy).toHaveBeenCalledWith("password", 12);
        }));
        test("Deve retornar o password criptografado", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const hashed_password = yield sut.hash("password");
            expect(hashed_password).toBe("hashed_password");
        }));
        test("Deve retornar um erro quando o hash falhar", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            jest.spyOn(bcrypt_1.default, "hash").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.hash("password");
            yield expect(promise).rejects.toThrow();
        }));
    });
    describe("compare()", () => {
        test("Deve chamar o compare com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const compareSpy = jest.spyOn(bcrypt_1.default, "compare");
            yield sut.compare("any_value", "any_hash");
            expect(compareSpy).toHaveBeenCalledWith("any_value", "any_hash");
        }));
        test("Deve retornar true quando o compare tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const isValid = yield sut.compare("any_value", "any_hash");
            expect(isValid).toBe(true);
        }));
        test("Deve retornar false quando o compare falhar", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            jest
                .spyOn(bcrypt_1.default, "compare")
                .mockImplementationOnce(() => new Promise((resolve) => resolve(false)));
            const isValid = yield sut.compare("any_value", "any_hash");
            expect(isValid).toBe(false);
        }));
        test("Deve retornar um erro quando o compare falhar", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            jest.spyOn(bcrypt_1.default, "compare").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.compare("any_value", "any_hash");
            yield expect(promise).rejects.toThrow();
        }));
    });
});
