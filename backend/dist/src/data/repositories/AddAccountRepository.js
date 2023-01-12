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
exports.AddAccountRepository = void 0;
class AddAccountRepository {
    constructor(hasher, addAccountRepository, loadAccountByEmailRepository) {
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
        this.hasher = hasher;
        this.addAccountRepository = addAccountRepository;
        this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    }
    add(accountData) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.loadAccountByEmailRepository.loadByEmail(accountData.email);
            if (!account) {
                const hashedPassword = yield this.hasher.hash(accountData.password);
                const newAccount = yield this.addAccountRepository.add(Object.assign(accountData, { password: hashedPassword }));
                return new Promise((resolve) => resolve(newAccount));
            }
            return null;
        });
    }
}
exports.AddAccountRepository = AddAccountRepository;
