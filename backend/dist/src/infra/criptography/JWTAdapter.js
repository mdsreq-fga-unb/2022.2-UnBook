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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTAdapter {
    constructor(secret) {
        this.secret = secret;
        this.secret = secret;
    }
    encrypt(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const acessToken = jsonwebtoken_1.default.sign({ id: value }, this.secret);
            return acessToken;
        });
    }
    decrypt(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const valueDecrypted = jsonwebtoken_1.default.verify(value, this.secret);
            return valueDecrypted;
        });
    }
}
exports.JWTAdapter = JWTAdapter;
