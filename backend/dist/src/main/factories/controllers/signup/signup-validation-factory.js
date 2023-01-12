"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpValidation = void 0;
const EmailValidatorAdapter_1 = require("../../../../infra/validators/EmailValidatorAdapter");
const validators_1 = require("../../../../validation/validators");
const makeSignUpValidation = () => {
    const validations = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
        validations.push(new validators_1.RequiredFieldValidation(field));
    }
    validations.push(new validators_1.CompareFieldsValidation("password", "passwordConfirmation"));
    validations.push(new validators_1.EmailValidation("email", new EmailValidatorAdapter_1.EmailValidatorAdapter()));
    return new validators_1.ValidationComposite(validations);
};
exports.makeSignUpValidation = makeSignUpValidation;
