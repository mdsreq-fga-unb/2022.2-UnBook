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
exports.SignUpController = void 0;
const email_in_use_error_1 = require("../../errors/email-in-use-error");
const http_helper_1 = require("../../helpers/http/http-helper");
class SignUpController {
    constructor(addAccount, validation, authentication) {
        this.addAccount = addAccount;
        this.validation = validation;
        this.authentication = authentication;
        this.addAccount = addAccount;
        this.validation = validation;
        this.authentication = authentication;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const error = this.validation.validate(httpRequest.body);
                if (error) {
                    return (0, http_helper_1.badRequest)(error);
                }
                const { name, email, password } = httpRequest.body;
                const account = yield this.addAccount.add({
                    name,
                    email,
                    password,
                });
                if (!account) {
                    return (0, http_helper_1.forbidden)(new email_in_use_error_1.EmailInUseError());
                }
                const accessToken = yield this.authentication.auth({
                    email,
                    password,
                });
                return (0, http_helper_1.ok)({ accessToken });
            }
            catch (error) {
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.SignUpController = SignUpController;
