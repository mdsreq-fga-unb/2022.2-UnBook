import { RequiredFieldValidation } from "../../../src/validation/required-field/RequiredFieldValidation";
import { EmailValidation } from "../../../src/validation/validators/email/EmailValidation";
import { MinLengthValidation } from "../../../src/validation/validators/min-lenth/MinLengthValidation";
import { ValidationBuilder as sut } from "../../../src/validation/validators/builder/ValidationBuilder";
import { faker } from "@faker-js/faker";
import { CompareFieldsValidation } from "../../../src/validation/validators/compare-field/CompareFieldsValidation";

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

	test("Deve retornar um CompareFieldsValidation", () => {
		const field = faker.database.column();
		const fieldToCompare = faker.database.column();
		const validations = sut.field(field).sameAs(fieldToCompare).build();
		expect(validations).toEqual([
			new CompareFieldsValidation(field, fieldToCompare),
		]);
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
