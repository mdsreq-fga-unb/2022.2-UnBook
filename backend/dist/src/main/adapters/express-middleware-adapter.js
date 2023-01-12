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
exports.adaptMiddleware = void 0;
const adaptMiddleware = (middleware) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            headers: request.headers,
        };
        const httpResponse = yield middleware.handle(httpRequest);
        if (httpResponse.statusCode === 200) {
            Object.assign(request, httpResponse.body);
            next();
        }
        else {
            response
                .status(httpResponse.statusCode)
                .json({ error: httpResponse.body.message });
        }
    });
};
exports.adaptMiddleware = adaptMiddleware;
