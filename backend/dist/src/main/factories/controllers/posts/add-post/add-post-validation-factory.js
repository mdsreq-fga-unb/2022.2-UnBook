"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddPostValidation = void 0;
const validators_1 = require("../../../../../validation/validators");
const makeAddPostValidation = () => {
    const validations = [];
    for (const field of ["content"]) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    return new validators_1.ValidationComposite(validations);
};
exports.makeAddPostValidation = makeAddPostValidation;
