/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequiredFieldError } from "../../errors/RequiredFieldError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class RequiredFieldValidation implements IFieldValidation {
	constructor(readonly field: string) {}
	validate(value: string): Error {
		return value ? null : new RequiredFieldError();
	}
}

export { RequiredFieldValidation };
