"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noContent = exports.unauthorized = exports.ok = exports.serverError = exports.forbidden = exports.badRequest = void 0;
const errors_1 = require("../../errors");
const badRequest = (error) => {
    return {
        statusCode: 400,
        body: error,
    };
};
exports.badRequest = badRequest;
const forbidden = (error) => {
    return {
        statusCode: 403,
        body: error,
    };
};
exports.forbidden = forbidden;
const serverError = (error) => {
    return {
        statusCode: 500,
        body: new errors_1.ServerError(error.stack),
    };
};
exports.serverError = serverError;
const ok = (data) => {
    return {
        statusCode: 200,
        body: data,
    };
};
exports.ok = ok;
const noContent = () => {
    return {
        statusCode: 204,
        body: null,
    };
};
exports.noContent = noContent;
const unauthorized = () => {
    return {
        statusCode: 401,
        body: new errors_1.UnauthorizedError(),
    };
};
exports.unauthorized = unauthorized;
