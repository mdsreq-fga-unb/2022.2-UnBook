import { InvalidFieldError } from "../../errors/InvalidFieldError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class CompareFieldsValidation implements IFieldValidation {
	constructor(
		readonly field: string,
		private readonly fieldToCompare: string
	) {}
	validate(input: object): Error {
		return input[this.field] !== input[this.fieldToCompare]
			? new InvalidFieldError()
			: null;
	}
}

export { CompareFieldsValidation };
