import { RequiredFieldError } from "../../../src/validation/errors/RequiredFieldError";
import { RequiredFieldValidation } from "../../../src/validation/required-field/RequiredFieldValidation";
import { faker } from "@faker-js/faker";

const makeSut = (): RequiredFieldValidation => {
	return new RequiredFieldValidation(faker.internet.email());
};

describe("RequiredFieldValidation", () => {
	test("Deve retornar erro se o campo estiver vazio", () => {
		const sut = makeSut();
		const error = sut.validate("");
		expect(error).toEqual(new RequiredFieldError());
	});

	test("Deve retornar falso se o campo não estiver vazio", () => {
		const sut = makeSut();
		const error = sut.validate(faker.internet.email());
		expect(error).toBeFalsy();
	});

	test("Deve retornar erro se o campo for nulo", () => {
		const sut = makeSut();
		const error = sut.validate(null);
		expect(error).toEqual(new RequiredFieldError());
	});

	test("Deve retornar erro se o campo for indefinido", () => {
		const sut = makeSut();
		const error = sut.validate(undefined);
		expect(error).toEqual(new RequiredFieldError());
	});
});
