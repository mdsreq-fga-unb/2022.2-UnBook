"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldsValidation = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
const errors_1 = require("../../presentation/errors");
class CompareFieldsValidation {
    constructor(fieldName, fieldToCompare) {
        this.fieldName = fieldName;
        this.fieldToCompare = fieldToCompare;
        this.fieldName = fieldName;
        this.fieldToCompare = fieldToCompare;
    }
    validate(input) {
        if (input[this.fieldName] !== input[this.fieldToCompare]) {
            return new errors_1.InvalidParamError(this.fieldToCompare);
        }
    }
}
exports.CompareFieldsValidation = CompareFieldsValidation;
