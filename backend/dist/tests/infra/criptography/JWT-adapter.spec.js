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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTAdapter_1 = require("../../../src/infra/criptography/JWTAdapter");
jest.mock("jsonwebtoken", () => ({
    sign() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve("any_token"));
        });
    },
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => resolve("any_value"));
        });
    },
}));
const makeSut = () => {
    return new JWTAdapter_1.JWTAdapter("secret_key");
};
describe("JWT Adapter", () => {
    describe("sign", () => {
        test("Deve chamar o Sign com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const signSpy = jest.spyOn(jsonwebtoken_1.default, "sign");
            yield sut.encrypt("any_value");
            expect(signSpy).toHaveBeenCalledWith({ id: "any_value" }, "secret_key");
        }));
        test("Deve retornar um token quando o sign tem sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const acesssToken = yield sut.encrypt("any_value");
            expect(acesssToken).toBe("any_token");
        }));
        test("Deve lançar um erro quando o sign retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            jest.spyOn(jsonwebtoken_1.default, "sign").mockImplementation(() => {
                throw new Error();
            });
            const promise = sut.encrypt("any_value");
            yield expect(promise).rejects.toThrow();
        }));
    });
    describe("verify()", () => {
        test("Deve chamar o verify com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const verifySpy = jest.spyOn(jsonwebtoken_1.default, "verify");
            yield sut.decrypt("any_token");
            expect(verifySpy).toHaveBeenCalledWith("any_token", "secret_key");
        }));
    });
    test("Deve retornar um token quando o verify tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        const value = yield sut.decrypt("any_token");
        expect(value).toBe("any_value");
    }));
    test("Deve lançar um erro quando o verify retornar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        jest.spyOn(jsonwebtoken_1.default, "verify").mockImplementation(() => {
            throw new Error();
        });
        const promise = sut.decrypt("any_token");
        yield expect(promise).rejects.toThrow();
    }));
});
