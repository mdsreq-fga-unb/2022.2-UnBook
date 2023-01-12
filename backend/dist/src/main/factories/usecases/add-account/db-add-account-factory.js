"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbAddAccount = void 0;
const AddAccountRepository_1 = require("../../../../data/repositories/AddAccountRepository");
const BcryptAdapter_1 = require("../../../../infra/criptography/BcryptAdapter");
const AccountMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/account/AccountMongoRepository");
const makeDbAddAccount = () => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter_1.BcryptAdapter(salt);
    const accountMongoRepository = new AccountMongoRepository_1.AccountMongoRepository();
    return new AddAccountRepository_1.AddAccountRepository(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
exports.makeDbAddAccount = makeDbAddAccount;
