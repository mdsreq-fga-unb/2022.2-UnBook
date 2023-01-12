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
const mockdate_1 = __importDefault(require("mockdate"));
const LoadPostsController_1 = require("../../../src/presentation/controllers/post/LoadPostsController");
const http_helper_1 = require("../../../src/presentation/helpers/http/http-helper");
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
    class LoadPostsStub {
        load() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => resolve(makeFakePosts()));
            });
        }
    }
    const loadPostsStub = new LoadPostsStub();
    const sut = new LoadPostsController_1.LoadPostsController(loadPostsStub);
    return {
        sut,
        loadPostsStub,
    };
};
describe("LoadPost Controller", () => {
    beforeAll(() => {
        mockdate_1.default.set(new Date());
    });
    afterAll(() => {
        mockdate_1.default.reset();
    });
    test("Deve chamar o LoadPosts", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadPostsStub } = makeSut();
        const loadSpy = jest.spyOn(loadPostsStub, "load");
        yield sut.handle({});
        expect(loadSpy).toHaveBeenCalled();
    }));
    test("Deve retornar 200 quando tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut } = makeSut();
        const httpResponse = yield sut.handle({});
        expect(httpResponse).toEqual((0, http_helper_1.ok)(makeFakePosts()));
    }));
    test("Deve retornar 204 se LoadPosts retornar vazio", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadPostsStub } = makeSut();
        jest
            .spyOn(loadPostsStub, "load")
            .mockReturnValueOnce(new Promise((resolve) => resolve([])));
        const httpResponse = yield sut.handle({});
        expect(httpResponse).toEqual((0, http_helper_1.noContent)());
    }));
    test("Deve retornar 500 se o LoadPosts lançar um erro", () => __awaiter(void 0, void 0, void 0, function* () {
        const { sut, loadPostsStub } = makeSut();
        jest
            .spyOn(loadPostsStub, "load")
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
        const httpResponse = yield sut.handle({});
        expect(httpResponse).toEqual((0, http_helper_1.serverError)(new Error()));
    }));
});
