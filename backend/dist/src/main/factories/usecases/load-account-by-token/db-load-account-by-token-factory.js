"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadAccountByToken = void 0;
const LoadAccountByTokenRepository_1 = require("../../../../data/repositories/LoadAccountByTokenRepository");
const JWTAdapter_1 = require("../../../../infra/criptography/JWTAdapter");
const AccountMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/account/AccountMongoRepository");
const env_1 = __importDefault(require("../../../config/env"));
const makeDbLoadAccountByToken = () => {
    const jwtAdapter = new JWTAdapter_1.JWTAdapter(env_1.default.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository_1.AccountMongoRepository();
    return new LoadAccountByTokenRepository_1.LoadAccountByTokenRepository(jwtAdapter, accountMongoRepository);
};
exports.makeDbLoadAccountByToken = makeDbLoadAccountByToken;
