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
const mongo_helper_1 = require("../../../../../../src/infra/database/mongodb/helpers/mongo-helper");
const PostMongoRepository_1 = require("../../../../../../src/infra/database/mongodb/repositories/posts/PostMongoRepository");
let postCollection;
describe("Account Mongo Repository", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.disconnect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        postCollection = mongo_helper_1.MongoHelper.getCollection("posts");
        yield postCollection.deleteMany({});
    }));
    const makeSut = () => {
        return new PostMongoRepository_1.PostMongoRepository();
    };
    describe("Add", () => {
        test("Deve adicionar um post quando tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            yield sut.add({
                content: "any_content",
                date: new Date(),
            });
            const post = yield postCollection.findOne({ content: "any_content" });
            expect(post).toBeTruthy();
        }));
    });
    describe("loadAll", () => {
        test("Deve carregar todos os posts quando tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            yield postCollection.insertMany([
                {
                    content: "any_content",
                    date: new Date(),
                },
                {
                    content: "other_content",
                    date: new Date(),
                },
            ]);
            const sut = makeSut();
            const posts = yield sut.loadAll();
            expect(posts.length).toBe(2);
            expect(posts[0].content).toBe("any_content");
            expect(posts[1].content).toBe("other_content");
        }));
        test("Deve retornar uma lista vazia", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const posts = yield sut.loadAll();
            expect(posts.length).toBe(0);
        }));
    });
});
