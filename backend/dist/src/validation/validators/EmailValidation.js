"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
const errors_1 = require("../../presentation/errors");
class EmailValidation {
    constructor(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    validate(input) {
        const isValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new errors_1.InvalidParamError(this.fieldName);
        }
    }
}
exports.EmailValidation = EmailValidation;
