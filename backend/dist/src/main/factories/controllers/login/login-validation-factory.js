"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogInValidation = void 0;
const EmailValidatorAdapter_1 = require("../../../../infra/validators/EmailValidatorAdapter");
const validators_1 = require("../../../../validation/validators");
const makeLogInValidation = () => {
    const validations = [];
    for (const field of ["email", "password"]) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.EmailValidation("email", new EmailValidatorAdapter_1.EmailValidatorAdapter()));
    return new validators_1.ValidationComposite(validations);
};
exports.makeLogInValidation = makeLogInValidation;
