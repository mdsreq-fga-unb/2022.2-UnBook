/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamError } from "../../errors/invalid-param-error";
import { IFielValidation } from "../../protocols/IFieldValidation";

class EmailValidation implements IFielValidation {
	constructor(readonly field: string) {
		this.field = field;
	}
	validate(value: string): Error {
		return new InvalidParamError(this.field);
	}
}

export { EmailValidation };
