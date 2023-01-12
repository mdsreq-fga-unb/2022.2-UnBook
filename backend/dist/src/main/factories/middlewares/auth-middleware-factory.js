"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthMiddleware = void 0;
const AuthMiddleware_1 = require("../../../presentation/middlewares/AuthMiddleware");
const db_load_account_by_token_factory_1 = require("../usecases/load-account-by-token/db-load-account-by-token-factory");
const makeAuthMiddleware = () => {
    return new AuthMiddleware_1.AuthMiddleware((0, db_load_account_by_token_factory_1.makeDbLoadAccountByToken)());
};
exports.makeAuthMiddleware = makeAuthMiddleware;
