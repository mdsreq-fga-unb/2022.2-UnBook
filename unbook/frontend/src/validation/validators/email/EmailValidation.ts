/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamError } from "../../errors/InvalidParamError";
import { IFielValidation } from "../../protocols/IFieldValidation";

class EmailValidation implements IFielValidation {
	constructor(readonly field: string) {
		this.field = field;
	}
	validate(value: string): Error {
		const emailRegex =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return !value || emailRegex.test(value)
			? null
			: new InvalidParamError(this.field);
	}
}

export { EmailValidation };
