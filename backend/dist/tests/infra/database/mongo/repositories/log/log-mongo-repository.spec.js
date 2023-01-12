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
const LogMongoRepository_1 = require("../../../../../../src/infra/database/mongodb/repositories/log/LogMongoRepository");
const makeSut = () => {
    return new LogMongoRepository_1.LogMongoRepository();
};
describe("Log Mongo Repository", () => {
    let errorCollection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.connect(process.env.MONGO_URL);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongo_helper_1.MongoHelper.disconnect();
    }));
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        errorCollection = mongo_helper_1.MongoHelper.getCollection("errors");
        yield errorCollection.deleteMany({});
    }));
    test("Devia criar um log de erro com sucesso", () => __awaiter(void 0, void 0, void 0, function* () {
        const sut = makeSut();
        yield sut.logError("any_error");
        const count = yield errorCollection.countDocuments();
        expect(count).toBe(1);
    }));
});
