/* eslint-disable @typescript-eslint/no-unused-vars */
import { IValidation } from "../../../../src/presentation/protocols/IValidation";

class ValidationStub implements IValidation {
	errorMessage: string;

	validate(fieldName: string, fieldValue: string): string {
		return this.errorMessage;
	}
}

export { ValidationStub };
