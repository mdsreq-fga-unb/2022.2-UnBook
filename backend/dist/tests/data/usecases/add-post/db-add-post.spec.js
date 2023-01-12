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
/* eslint-disable @typescript-eslint/no-unused-vars */
const mockdate_1 = __importDefault(require("mockdate"));
const AddPostRepository_1 = require("../../../../src/data/repositories/AddPostRepository");
const makeFakePostData = () => ({
    content: "valid_content",
    date: new Date(),
});
const makeAddPostRepository = () => {
    class AddPostRepositoryStub {
        add(postData) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve());
            });
        }
    }
    return new AddPostRepositoryStub();
};
const makeSut = () => {
    const addPostRepositoryStub = makeAddPostRepository();
    const sut = new AddPostRepository_1.AddPostRepository(addPostRepositoryStub);
    return {
        sut,
        addPostRepositoryStub,
    };
};
describe("AddPost Repository UseCase", () => {
    beforeAll(() => {
        mockdate_1.default.set(new Date());
    });
    afterAll(() => {
        mockdate_1.default.reset();
    });
    test("Deve chamar o AddPostRepository com os valores corretos", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addPostRepositoryStub } = makeSut();
        const addSpy = jest.spyOn(addPostRepositoryStub, "add");
        const postData = makeFakePostData();
        yield sut.add(postData);
        expect(addSpy).toHaveBeenCalledWith(postData);
    }));
    test("Deve lançar um erro de o AddPostRepository falhar", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, addPostRepositoryStub } = makeSut();
        jest.spyOn(addPostRepositoryStub, "add").mockRejectedValueOnce(new Error());
        const promise = sut.add(makeFakePostData());
        yield expect(promise).rejects.toThrow();
    }));
});
