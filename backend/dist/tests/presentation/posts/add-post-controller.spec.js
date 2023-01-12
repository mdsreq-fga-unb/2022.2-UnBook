"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
const faker_1 = require("@faker-js/faker");
const mockdate_1 = __importDefault(require("mockdate"));
const AddPostController_1 = require("../../../src/presentation/controllers/post/AddPostController");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
const makeFakeRequest = () => ({
    body: {
        content: faker_1.faker.lorem.paragraph(),
        date: new Date(),
    },
});
const makeValidation = () => {
    class ValidationStub {
        validate(input) {
            return null;
        }
    }
    return new ValidationStub();
};
const makeAddPost = () => {
    class AddPostStub {
        add(data) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(null));
            });
        }
    }
    return new AddPostStub();
};
const makeSut = () => {
    const validationStub = makeValidation();
    const addPostStub = makeAddPost();
    const sut = new AddPostController_1.AddPostController(validationStub, addPostStub);
    return {
        sut,
        validationStub,
        addPostStub,
    };
};
describe("AddPost Controller", () => {
    beforeAll(() => {
        mockdate_1.default.set(new Date());
    });
    afterAll(() => {
        mockdate_1.default.reset();
    });
    test("Deve chamar o authentication com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        const validateSpy = jest.spyOn(validationStub, "validate");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
    }));
    test("Deve retornar 400 se a validação falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, validationStub } = makeSut();
        jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.badRequest)(new Error()));
    }));
    test("Deve chamar o AddPost com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addPostStub } = makeSut();
        const addSpy = jest.spyOn(addPostStub, "add");
        const httpRequest = makeFakeRequest();
        yield sut.handle(httpRequest);
        expect(addSpy).toBeCalledWith(httpRequest.body);
    }));
    test("Deve retornar um erro 500 se o AddPosta lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addPostStub } = makeSut();
        const addSpy = jest
            .spyOn(addPostStub, "add")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
    test("Deve retornar 204 de tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle(makeFakeRequest());
        expect(httpResponse).toEqual((0, http_helper_1.noContent)());
    }));
});
