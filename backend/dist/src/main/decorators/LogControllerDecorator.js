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
exports.LogControllerDecorator = void 0;
class LogControllerDecorator {
    constructor(controller, logErrorRepository) {
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
        this.controller = controller;
        this.logErrorRepository = logErrorRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const httpResponse = yield this.controller.handle(httpRequest);
            if (httpResponse.statusCode === 500) {
                yield this.logErrorRepository.logError(httpResponse.body.stack);
            }
            return httpResponse;
        });
    }
}
exports.LogControllerDecorator = LogControllerDecorator;
