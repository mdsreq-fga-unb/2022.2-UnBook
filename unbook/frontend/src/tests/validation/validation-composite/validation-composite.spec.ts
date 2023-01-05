import { ValidationComposite } from "../../../validation/validators/validation-composite/ValidationComposite";
import { FieldValidationSpy } from "../mocks/Mock-FieldValidationSpy";

type SutTypes = {
	sut: ValidationComposite;
	fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (): SutTypes => {
	const fieldValidationsSpy = [
		new FieldValidationSpy("any_field"),
		new FieldValidationSpy("any_field"),
	];
	const sut = new ValidationComposite(fieldValidationsSpy);
	return {
		sut,
		fieldValidationsSpy,
	};
};

describe("ValidationComposite", () => {
	test("Deve retornar erro se alguma validação falhar", () => {
		const { sut, fieldValidationsSpy } = makeSut();
		fieldValidationsSpy[0].error = new Error("first_error_message");
		fieldValidationsSpy[1].error = new Error("second_error_message");
		const error = sut.validate("any_field", "any_value");
		expect(error).toBe("first_error_message");
	});
});
