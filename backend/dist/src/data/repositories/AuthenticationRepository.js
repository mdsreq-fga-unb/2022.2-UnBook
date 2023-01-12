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
exports.AuthenticationRepository = void 0;
class AuthenticationRepository {
    constructor(loadAccountByEmailRepository, hashComparer, encrypter, updateAccessTokenRepository) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.updateAccessTokenRepository = updateAccessTokenRepository;
    }
    auth(authentication) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.loadAccountByEmailRepository.loadByEmail(authentication.email);
            if (account) {
                const isValid = yield this.hashComparer.compare(authentication.password, account.password);
                if (isValid) {
                    const accessToken = yield this.encrypter.encrypt(account.id);
                    yield this.updateAccessTokenRepository.updateAcessToken(account.id, accessToken);
                    return accessToken;
                }
            }
            return null;
        });
    }
}
exports.AuthenticationRepository = AuthenticationRepository;
