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
const bcrypt_1 = require("bcrypt");
const supertest_1 = __importDefault(require("supertest"));
const mongo_helper_1 = require("../../../src/infra/database/mongodb/helpers/mongo-helper");
const app_1 = require("../../../src/main/config/app");
let accountCollection;
describe("Login Routes", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.disconnect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
        yield accountCollection.deleteMany({});
    }));
    describe("POST/ signup", () => {
        test("Deve retornar 200 quando o signup tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post("/api/signup")
                .send({
                name: "any_name",
                email: "any_email@aluno.unb.br",
                password: "any_password",
                passwordConfirmation: "any_password",
            })
                .expect(200);
        }));
    });
    describe("POST/ login", () => {
        test("Deve retornar 200 quando o login tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const password = yield (0, bcrypt_1.hash)("any_password", 12);
            yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@aluno.unb.br",
                password,
            });
            yield (0, supertest_1.default)(app_1.app)
                .post("/api/login")
                .send({
                email: "any_email@aluno.unb.br",
                password: "any_password",
            })
                .expect(200);
        }));
        test("Deve 401 quando o usuário não for encontrado", () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app_1.app)
                .post("/api/login")
                .send({
                email: "any_email@aluno.unb.br",
                password: "any_password",
            })
                .expect(401);
        }));
    });
});
