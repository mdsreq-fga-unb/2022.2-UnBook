import { InvalidParamError } from "../../../src/validation/errors/InvalidParamError";
import { EmailValidation } from "../../../src/validation/validators/email/EmailValidation";
import { faker } from "@faker-js/faker";

const makeSut = (field: string): EmailValidation => {
	return new EmailValidation(field);
};

describe("EmailValidation", () => {
	test("Deve retornar erro se o email for inválido", () => {
		const field = faker.internet.email();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: faker.random.word() });
		expect(error).toEqual(new InvalidParamError(field));
	});

	test("Deve retornar falso se o email for inválido", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: faker.internet.email() });
		expect(error).toBeFalsy();
	});

	test("Deve retornar falso se o email for vazio", () => {
		const field = faker.database.column();
		const sut = makeSut(field);
		const error = sut.validate({ [field]: "" });
		expect(error).toBeFalsy();
	});
});
