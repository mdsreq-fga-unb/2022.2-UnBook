import { RequiredFieldValidation } from "../../../validation/required-field/RequiredFieldValidation";
import { EmailValidation } from "../../../validation/validators/email/EmailValidation";
import { MinLengthValidation } from "../../../validation/validators/min-lenth/MinLengthValidation";
import { ValidationBuilder as sut } from "../../../validation/validators/builder/ValidationBuilder";
import { faker } from "@faker-js/faker";

describe("ValidationBuilder", () => {
	test("Deve return um RequiredFieldValidation", () => {
		const field = faker.database.column();
		const validations = sut.field(field).required().build();
		expect(validations).toEqual([new RequiredFieldValidation(field)]);
	});

	test("Deve retornar um EmailValidation", () => {
		const field = faker.database.column();
		const validations = sut.field(field).email().build();
		expect(validations).toEqual([new EmailValidation(field)]);
	});

	test("Deve retornar um MinLengthValidation", () => {
		const field = faker.database.column();
		const length = faker.datatype.number();
		const validations = sut.field(field).min(length).build();
		expect(validations).toEqual([new MinLengthValidation(field, length)]);
	});

	test("Deve retornar uma lista de validações", () => {
		const field = faker.database.column();
		const length = faker.datatype.number();
		const validations = sut.field(field).required().min(length).email().build();
		expect(validations).toEqual([
			new RequiredFieldValidation(field),
			new MinLengthValidation(field, length),
			new EmailValidation(field),
		]);
	});
});
