import { RequiredFieldError } from "../../../validation/errors/required-field-error";
import { RequiredFieldValidation } from "../../../validation/validators/required-field/required-field-validation";
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
});
