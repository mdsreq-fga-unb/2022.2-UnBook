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
const AccountMongoRepository_1 = require("../../../../../../src/infra/database/mongodb/repositories/account/AccountMongoRepository");
let accountCollection;
describe("Account Mongo Repository", () => {
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
    const makeSut = () => {
        return new AccountMongoRepository_1.AccountMongoRepository();
    };
    describe("add()", () => {
        test("Deve retornar uma account quando add tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const account = yield sut.add({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            });
            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe("any_name");
            expect(account.email).toBe("any_email@mail.com");
            expect(account.password).toBe("any_password");
        }));
    });
    describe("loadByEmail()", () => {
        test("Deve retornar uma account quando loadByEmail tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            });
            const account = yield sut.loadByEmail("any_email@mail.com");
            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe("any_name");
            expect(account.email).toBe("any_email@mail.com");
            expect(account.password).toBe("any_password");
        }));
        test("Deve retornar null se o loadByEmail falhar", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const account = yield sut.loadByEmail("any_email@mail.com");
            expect(account).toBeFalsy();
        }));
    });
    describe("updateAccessToken()", () => {
        test("Deve retornar um update do token de acesso quando o updateAcessToken tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const result = yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
            });
            let account = yield accountCollection.findOne({ _id: result.insertedId });
            expect(account.accessToken).toBeFalsy();
            yield sut.updateAcessToken(result.insertedId.toString(), "any_token");
            account = yield accountCollection.findOne({ _id: result.insertedId });
            expect(account).toBeTruthy();
            expect(account.accessToken).toEqual("any_token");
        }));
    });
    describe("loadByToken()", () => {
        test("Deve retornar uma account quando loadByToken tiver sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            yield accountCollection.insertOne({
                name: "any_name",
                email: "any_email@mail.com",
                password: "any_password",
                accessToken: "any_token",
            });
            const account = yield sut.loadByToken("any_token");
            expect(account).toBeTruthy();
            expect(account.id).toBeTruthy();
            expect(account.name).toBe("any_name");
            expect(account.email).toBe("any_email@mail.com");
            expect(account.password).toBe("any_password");
        }));
        test("Deve retornar null se o loadByToken falhar", () => __awaiter(void 0, void 0, void 0, function* () {
            const sut = makeSut();
            const account = yield sut.loadByToken("any_token");
            expect(account).toBeFalsy();
        }));
    });
});
