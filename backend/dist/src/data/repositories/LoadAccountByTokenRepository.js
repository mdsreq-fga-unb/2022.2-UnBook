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
exports.LoadAccountByTokenRepository = void 0;
class LoadAccountByTokenRepository {
    constructor(decrypter, loadAccountByTokenRepository) {
        this.decrypter = decrypter;
        this.loadAccountByTokenRepository = loadAccountByTokenRepository;
    }
    load(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.decrypter.decrypt(accessToken);
            if (token) {
                const account = yield this.loadAccountByTokenRepository.loadByToken(accessToken);
                if (account) {
                    return account;
                }
            }
            return null;
        });
    }
}
exports.LoadAccountByTokenRepository = LoadAccountByTokenRepository;
