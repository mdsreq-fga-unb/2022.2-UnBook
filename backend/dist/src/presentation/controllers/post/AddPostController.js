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
exports.AddPostController = void 0;
const http_helper_1 = require("../../helpers/http/http-helper");
class AddPostController {
    constructor(validation, addPost) {
        this.validation = validation;
        this.addPost = addPost;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = this.validation.validate(httpRequest.body);
                if (test) {
                    return (0, http_helper_1.badRequest)(test);
                }
                const { content } = httpRequest.body;
                yield this.addPost.add({ content, date: new Date() });
                return (0, http_helper_1.noContent)();
            }
            catch (error) {
                return (0, http_helper_1.serverError)(error);
            }
        });
    }
}
exports.AddPostController = AddPostController;
