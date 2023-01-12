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
exports.adaptRoute = void 0;
const adaptRoute = (controller) => {
    return (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        const httpRequest = {
            body: request.body,
        };
        const httpResponse = yield controller.handle(httpRequest);
        if (httpResponse.statusCode === 200 || httpResponse.statusCode === 204) {
            response.status(httpResponse.statusCode).json(httpResponse.body);
        }
        else {
            response
                .status(httpResponse.statusCode)
                .json({ error: httpResponse.body.message });
        }
    });
};
exports.adaptRoute = adaptRoute;
