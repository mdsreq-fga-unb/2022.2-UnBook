import { ValidationComposite } from "../../../validation/validators/validation-composite/ValidationComposite";
import { FieldValidationSpy } from "../mocks/Mock-FieldValidationSpy";

describe("ValidationComposite", () => {
	test("Deve retornar erro se alguma validação falhar", () => {
		const fieldValidationSpy_1 = new FieldValidationSpy("any_field");
		fieldValidationSpy_1.error = new Error("first_error_message");
		const fieldValidationSpy_2 = new FieldValidationSpy("any_field");
		fieldValidationSpy_2.error = new Error("second_error_message");
		const sut = new ValidationComposite([
			fieldValidationSpy_1,
			fieldValidationSpy_2,
		]);
		const error = sut.validate("any_field", "any_value");
		expect(error).toBe("first_error_message");
	});
});
