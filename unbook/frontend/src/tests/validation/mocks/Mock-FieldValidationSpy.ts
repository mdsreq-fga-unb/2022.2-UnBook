/* eslint-disable @typescript-eslint/no-unused-vars */
import { IFieldValidation } from "../../../validation/protocols/IFieldValidation";

class FieldValidationSpy implements IFieldValidation {
	error: Error = null;
	constructor(readonly field: string) {
		this.field = field;
	}
	validate(value: string): Error {
		return this.error;
	}
}

export { FieldValidationSpy };
