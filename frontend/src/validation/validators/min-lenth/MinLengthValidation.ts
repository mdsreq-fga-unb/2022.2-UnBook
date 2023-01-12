import { InvalidParamError } from "../../errors/InvalidParamError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class MinLengthValidation implements IFieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {
		this.field = field;
	}
	validate(input: object): Error {
		return input[this.field]?.length < this.minLength
			? new InvalidParamError(this.field)
			: null;
	}
}

export { MinLengthValidation };
