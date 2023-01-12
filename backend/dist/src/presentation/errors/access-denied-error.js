"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
class AccessDeniedError extends Error {
    constructor() {
        super("Acesso negado");
        this.name = "AccessDeniedError";
    }
}
exports.AccessDeniedError = AccessDeniedError;
