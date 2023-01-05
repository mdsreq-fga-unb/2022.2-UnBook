/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequiredFieldError } from "../errors/RequiredFieldError";
import { IFielValidation } from "../protocols/IFieldValidation";

class RequiredFieldValidation implements IFielValidation {
	constructor(readonly field: string) {}
	validate(value: string): Error {
		return value ? null : new RequiredFieldError();
	}
}

export { RequiredFieldValidation };
