"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbAuthentication = void 0;
const AuthenticationRepository_1 = require("../../../../data/repositories/AuthenticationRepository");
const BcryptAdapter_1 = require("../../../../infra/criptography/BcryptAdapter");
const JWTAdapter_1 = require("../../../../infra/criptography/JWTAdapter");
const AccountMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/account/AccountMongoRepository");
const env_1 = __importDefault(require("../../../config/env"));
const makeDbAuthentication = () => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter_1.BcryptAdapter(salt);
    const jwtAdpter = new JWTAdapter_1.JWTAdapter(env_1.default.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository_1.AccountMongoRepository();
    return new AuthenticationRepository_1.AuthenticationRepository(accountMongoRepository, bcryptAdapter, jwtAdpter, accountMongoRepository);
};
exports.makeDbAuthentication = makeDbAuthentication;
