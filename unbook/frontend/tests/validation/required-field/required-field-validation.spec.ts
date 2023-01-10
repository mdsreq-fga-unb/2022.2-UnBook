import { RequiredFieldError } from "../../../src/validation/errors/RequiredFieldError";
import { RequiredFieldValidation } from "../../../src/validation/required-field/RequiredFieldValidation";
import { faker } from "@faker-js/faker";

const makeSut = (field: string): RequiredFieldValidation => {
	return new RequiredFieldValidation(field);
};

describe("RequiredFieldValidation", () => {
	test("Deve retornar erro se o campo estiver vazio", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: "" });
		expect(error).toEqual(new RequiredFieldError());
	});

	test("Deve retornar falso se o campo não estiver vazio", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: faker.random.word() });
		expect(error).toBeFalsy();
	});

	test("Deve retornar erro se o campo for nulo", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: null });
		expect(error).toEqual(new RequiredFieldError());
	});

	test("Deve retornar erro se o campo for indefinido", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: undefined });
		expect(error).toEqual(new RequiredFieldError());
	});
});
