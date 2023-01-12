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
const LoadPostsRepository_1 = require("../../../../src/data/repositories/LoadPostsRepository");
const makeFakePosts = () => {
    return [
        {
            id: "any_id",
            content: "any_content",
            date: new Date(),
        },
        {
            id: "other_id",
            content: "other_content",
            date: new Date(),
        },
    ];
};
const makeSut = () => {
    class LoadPostsRepositoryStub {
        loadAll() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakePosts()));
            });
        }
    }
    const loadPostsRepositoryStub = new LoadPostsRepositoryStub();
    const sut = new LoadPostsRepository_1.LoadPostsRepository(loadPostsRepositoryStub);
    return {
        sut,
        loadPostsRepositoryStub,
    };
};
describe("LoadPost Controller", () => {
    test("Deve chamar o LoadPostsRepository", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadPostsRepositoryStub } = makeSut();
        const loadAllSpy = jest.spyOn(loadPostsRepositoryStub, "loadAll");
        yield sut.load();
        expect(loadAllSpy).toHaveBeenCalled();
    }));
    test("Deve retornar uma lista de posts com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const posts = yield sut.load();
        expect(posts).toEqual(makeFakePosts());
    }));
    test("Deve lançar um erro se o LoadPostRepository lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadPostsRepositoryStub } = makeSut();
        jest
            .spyOn(loadPostsRepositoryStub, "loadAll")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const promise = sut.load();
        yield expect(promise).rejects.toThrow();
    }));
});
