import { InvalidFieldError } from "../../errors/InvalidFieldError";
import { IFieldValidation } from "../../protocols/IFieldValidation";

class CompareFieldsValidation implements IFieldValidation {
	constructor(
		readonly field: string,
		private readonly valueToCompare: string
	) {}
	validate(value: string): Error {
		return new InvalidFieldError();
	}
}

export { CompareFieldsValidation };
