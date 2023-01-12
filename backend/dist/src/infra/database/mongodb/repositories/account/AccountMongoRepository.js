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
exports.AccountMongoRepository = void 0;
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
const mongodb_1 = require("mongodb");
const mongo_helper_1 = require("../../helpers/mongo-helper");
class AccountMongoRepository {
    add(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
            const result = yield accountCollection.insertOne(accountData);
            const id = result.insertedId;
            const account = yield accountCollection.findOne({ _id: id });
            if (account) {
                return {
                    id: account._id.toString(),
                    name: account.name,
                    email: account.email,
                    password: account.password,
                };
            }
            return null;
        });
    }
    loadByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
            const account = yield accountCollection.findOne({ email });
            if (account) {
                return {
                    id: account._id.toString(),
                    name: account.name,
                    email: account.email,
                    password: account.password,
                };
            }
            return null;
        });
    }
    updateAcessToken(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const idObject = new mongodb_1.ObjectId(id);
            const accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
            yield accountCollection.updateOne({
                _id: idObject,
            }, {
                $set: {
                    accessToken: token,
                },
            });
        });
    }
    loadByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountCollection = mongo_helper_1.MongoHelper.getCollection("accounts");
            const account = yield accountCollection.findOne({ accessToken: token });
            if (account) {
                return {
                    id: account._id.toString(),
                    name: account.name,
                    email: account.email,
                    password: account.password,
                };
            }
            return null;
        });
    }
}
exports.AccountMongoRepository = AccountMongoRepository;
