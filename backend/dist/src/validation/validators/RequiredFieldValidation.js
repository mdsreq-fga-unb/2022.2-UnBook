"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
const errors_1 = require("../../presentation/errors");
class RequiredFieldValidation {
    constructor(fieldName) {
        this.fieldName = fieldName;
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName]) {
            return new errors_1.MissingParamError(this.fieldName);
        }
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
