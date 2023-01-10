import { IFieldValidation } from "../../protocols/IFieldValidation";
import { RequiredFieldValidation } from "../required-field/RequiredFieldValidation";
import { EmailValidation } from "../email/EmailValidation";
import { MinLengthValidation } from "../min-lenth/MinLengthValidation";
import { CompareFieldsValidation } from "../compare-field/CompareFieldsValidation";

class ValidationBuilder {
	private constructor(
		private readonly fieldName: string,
		private readonly validations: IFieldValidation[]
	) {}

	static field(fieldName: string): ValidationBuilder {
		return new ValidationBuilder(fieldName, []);
	}

	required(): ValidationBuilder {
		this.validations.push(new RequiredFieldValidation(this.fieldName));
		return this;
	}

	email(): ValidationBuilder {
		this.validations.push(new EmailValidation(this.fieldName));
		return this;
	}

	min(length: number): ValidationBuilder {
		this.validations.push(new MinLengthValidation(this.fieldName, length));
		return this;
	}

	sameAs(fieldToCompare: string): ValidationBuilder {
		this.validations.push(
			new CompareFieldsValidation(this.fieldName, fieldToCompare)
		);
		return this;
	}

	build(): IFieldValidation[] {
		return this.validations;
	}
}

export { ValidationBuilder };
