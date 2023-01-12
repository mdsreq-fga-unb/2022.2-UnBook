/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamError } from "../../errors/InvalidParamError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class EmailValidation implements IFieldValidation {
	constructor(readonly field: string) {
		this.field = field;
	}
	validate(input: object): Error {
		const emailRegex =
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		return !input[this.field] || emailRegex.test(input[this.field])
			? null
			: new InvalidParamError(this.field);
	}
}

export { EmailValidation };
