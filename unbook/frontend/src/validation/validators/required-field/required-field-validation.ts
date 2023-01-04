/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequiredFieldError } from "../../errors/required-field-error";
import { IFielValidation } from "../../protocols/field-validation";

class RequiredFieldValidation implements IFielValidation {
	constructor(readonly field: string) {}
	validate(value: string): Error {
		return value ? null : new RequiredFieldError();
	}
}

export { RequiredFieldValidation };
