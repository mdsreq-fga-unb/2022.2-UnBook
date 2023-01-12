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
exports.AuthMiddleware = void 0;
const access_denied_error_1 = require("../errors/access-denied-error");
const http_helper_1 = require("../helpers/http/http-helper");
class AuthMiddleware {
    constructor(loadAccountByToken) {
        this.loadAccountByToken = loadAccountByToken;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = (_a = httpRequest.headers) === null || _a === void 0 ? void 0 : _a["x-access-token"];
                if (accessToken) {
                    const account = yield this.loadAccountByToken.load(accessToken);
                    if (account) {
                        return (0, http_helper_1.ok)({ accountId: account.id });
                    }
                }
                return (0, http_helper_1.forbidden)(new access_denied_error_1.AccessDeniedError());
            }
            catch (error) {
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
