import { InvalidFieldError } from "../../../src/validation/errors/InvalidFieldError";
import { CompareFieldsValidation } from "../../../src/validation/validators/compare-field/CompareFieldsValidation";
import { faker } from "@faker-js/faker";

const makeSut = (valueToCompare: string): CompareFieldsValidation => {
	return new CompareFieldsValidation(faker.database.column(), valueToCompare);
};

describe("CompareFieldsValidation", () => {
	test("Deve retornar erro se a comparção dos campos for inválida", () => {
		const sut = makeSut(faker.random.word());
		const error = sut.validate(faker.random.word());
		expect(error).toEqual(new InvalidFieldError());
	});

	test("Deve retornar falso se a comparação for válida", () => {
		const valueToCompare = faker.random.word();
		const sut = makeSut(valueToCompare);
		const error = sut.validate(valueToCompare);
		expect(error).toBeFalsy();
	});

	// test("Deve retornar erro se o campo for nulo", () => {
	// 	const sut = makeSut();
	// 	const error = sut.validate(null);
	// 	expect(error).toEqual(new RequiredFieldError());
	// });

	// test("Deve retornar erro se o campo for indefinido", () => {
	// 	const sut = makeSut();
	// 	const error = sut.validate(undefined);
	// 	expect(error).toEqual(new RequiredFieldError());
	// });
});
