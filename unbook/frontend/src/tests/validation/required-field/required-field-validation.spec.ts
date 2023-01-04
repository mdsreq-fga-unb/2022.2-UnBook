import { RequiredFieldError } from "../../../validations/errors/required-field-error";
import { RequiredFieldValidation } from "../../../validations/required-field/required-field-validation";
import { faker } from "@faker-js/faker";

describe("RequiredFieldValidation", () => {
	test("Deve retornar erro se o campo estiver vazio", () => {
		const sut = new RequiredFieldValidation("email");
		const error = sut.validate("");
		expect(error).toEqual(new RequiredFieldError());
	});

	test("Deve retornar falso se o campo não estiver vazio", () => {
		const sut = new RequiredFieldValidation("email");
		const error = sut.validate(faker.internet.email());
		expect(error).toBeFalsy();
	});
});
