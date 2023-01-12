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
/* eslint-disable @typescript-eslint/no-unused-vars */
const add_post_validation_factory_1 = require("../../../../src/main/factories/controllers/posts/add-post/add-post-validation-factory");
const validators_1 = require("../../../../src/validation/validators");
jest.mock("../../../../src/validation/validators/ValidationComposite");
describe("AddPostValidation Factory", () => {
    test("Deve chamar o ValidationComposite com todas as validações", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, add_post_validation_factory_1.makeAddPostValidation)();
        const validations = [];
        for (const field of ["content"]) {
            validations.push(new validators_1.RequiredFieldValidation(field));
        }
        expect(validators_1.ValidationComposite).toHaveBeenCalledWith(validations);
    }));
});
