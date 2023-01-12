"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailInUseError = void 0;
class EmailInUseError extends Error {
    constructor() {
        super("Esse email já está em uso");
        this.name = "InvalidParamError";
    }
}
exports.EmailInUseError = EmailInUseError;
