import { InvalidParamError } from "../../../src/validation/errors/InvalidParamError";
import { EmailValidation } from "../../../src/validation/validators/email/EmailValidation";
import { faker } from "@faker-js/faker";

const makeSut = (field = faker.database.column()): EmailValidation => {
	return new EmailValidation(field);
};

describe("EmailValidation", () => {
	test("Deve retornar erro se o email for inválido", () => {
		const sut = makeSut("email");
		const error = sut.validate(sut.field);
		expect(error).toEqual(new InvalidParamError("email"));
	});

	test("Deve retornar falso se o email for inválido", () => {
		const sut = makeSut();
		const error = sut.validate(faker.internet.email());
		expect(error).toBeFalsy();
	});

	test("Deve retornar falso se o email for vazio", () => {
		const sut = makeSut();
		const error = sut.validate("");
		expect(error).toBeFalsy();
	});
});
