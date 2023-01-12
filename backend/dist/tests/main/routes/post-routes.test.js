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
/* eslint-disable no-underscore-dangle */
const jsonwebtoken_1 = require("jsonwebtoken");
const supertest_1 = __importDefault(require("supertest"));
const mongo_helper_1 = require("../../../src/infra/database/mongodb/helpers/mongo-helper");
const app_1 = require("../../../src/main/config/app");
const env_1 = __importDefault(require("../../../src/main/config/env"));
let postCollection;
let accountCollection;
describe("Post Routes", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.disconnect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        postCollection = mongo_helper_1.MongoHelper.getCollection("posts");
        yield postCollection.deleteMany({});
        accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
        yield accountCollection.deleteMany({});
    }));
    describe("POST /post", () => {
        test("Deve retornar 403 quando add post não tiver um accessToken", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post("/api/posts")
                .send({
                content: "any_content",
            })
                .expect(403);
        }));
        test("Deve retornar 204 quando add post tiver um accessToken", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            });
            const objectId = result.insertedId;
            const id = objectId.toHexString();
            const accessToken = (0, jsonwebtoken_1.sign)({ id }, env_1.default.jwtSecret);
            yield accountCollection.updateOne({ _id: objectId }, {
                $set: {
                    accessToken,
                },
            });
            yield (0, supertest_1.default)(app_1.app)
                .post("/api/posts")
                .set("x-access-token", accessToken)
                .send({
                content: "any_content",
            })
                .expect(204);
        }));
    });
    describe("POST /post", () => {
        test("Deve retornar 403 quando não tiver um accessToken", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app).get("/api/posts").expect(403);
        }));
        test("Deve retornar 200 quando add post tiver um accessToken", () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            });
            const objectId = result.insertedId;
            const id = objectId.toHexString();
            const accessToken = (0, jsonwebtoken_1.sign)({ id }, env_1.default.jwtSecret);
            yield accountCollection.updateOne({ _id: objectId }, {
                $set: {
                    accessToken,
                },
            });
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
            yield (0, supertest_1.default)(app_1.app)
                .get("/api/posts")
                .set("x-access-token", accessToken)
                .send({
                content: "any_content",
            })
                .expect(200);
        }));
    });
});
