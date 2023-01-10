import { faker } from "@faker-js/faker";
import { ValidationComposite } from "../../../src/validation/validators/validation-composite/ValidationComposite";
import { FieldValidationSpy } from "../mocks/Mock-FieldValidationSpy";

type SutTypes = {
	sut: ValidationComposite;
	fieldValidationsSpy: FieldValidationSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
	const fieldValidationsSpy = [
		new FieldValidationSpy(fieldName),
		new FieldValidationSpy(fieldName),
	];
	const sut = ValidationComposite.build(fieldValidationsSpy);
	return {
		sut,
		fieldValidationsSpy,
	};
};

describe("ValidationComposite", () => {
	test("Deve retornar erro se alguma validação falhar", () => {
		const fieldName = faker.random.word();
		const { sut, fieldValidationsSpy } = makeSut(fieldName);
		const errorMessage = faker.random.words();
		fieldValidationsSpy[0].error = new Error(errorMessage);
		fieldValidationsSpy[1].error = new Error(faker.random.words());
		const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
		expect(error).toBe(errorMessage);
	});

	test("Deve retornar erro se nenhuma validação falhar", () => {
		const fieldName = faker.random.word();
		const { sut } = makeSut(fieldName);
		const error = sut.validate(fieldName, { [fieldName]: faker.random.word() });
		expect(error).toBeFalsy();
	});
});
