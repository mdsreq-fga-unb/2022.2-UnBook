import { IValidation } from "../../../presentation/protocols/IValidation";
import { IFielValidation } from "../../protocols/IFieldValidation";

class ValidationComposite implements IValidation {
	constructor(private readonly validators: IFielValidation[]) {}
	validate(fieldName: string, fieldValue: string): string {
		const validators = this.validators.filter(
			(validator) => validator.field === fieldName
		);
		for (const validator of validators) {
			const error = validator.validate(fieldValue);
			if (error) {
				return error.message;
			}
		}
	}
}

export { ValidationComposite };
