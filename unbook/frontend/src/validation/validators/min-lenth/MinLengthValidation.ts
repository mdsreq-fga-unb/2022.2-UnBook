import { InvalidParamError } from "../../errors/InvalidParamError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class MinLengthValidation implements IFieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {
		this.field = field;
	}
	validate(value: string): Error {
		return value.length >= this.minLength
			? null
			: new InvalidParamError(this.field);
	}
}

export { MinLengthValidation };
