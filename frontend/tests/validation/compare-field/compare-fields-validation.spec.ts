import { InvalidFieldError } from "../../../src/validation/errors/InvalidFieldError";
import { CompareFieldsValidation } from "../../../src/validation/validators/compare-field/CompareFieldsValidation";
import { faker } from "@faker-js/faker";

const makeSut = (
	field: string,
	fieldToCompare: string
): CompareFieldsValidation => {
	return new CompareFieldsValidation(field, fieldToCompare);
};

describe("CompareFieldsValidation", () => {
	test("Deve retornar erro se a comparção dos campos for inválida", () => {
		const field = faker.database.column();
		const fieldToCompare = faker.database.column();
		const sut = makeSut(field, fieldToCompare);
		const error = sut.validate({
			[field]: faker.database.column(),
			[fieldToCompare]: faker.database.column(),
		});
		expect(error).toEqual(new InvalidFieldError());
	});

	test("Deve retornar falso se a comparação for válida", () => {
		const field = faker.database.column();
		const fieldToCompare = faker.database.column();
		const value = faker.random.word();
		const sut = makeSut(field, fieldToCompare);
		const error = sut.validate({
			[field]: value,
			[fieldToCompare]: value,
		});
		expect(error).toBe(null);
	});
});
