import { faker } from "@faker-js/faker";
import { InvalidParamError } from "../../../src/validation/errors/InvalidParamError";
import { MinLengthValidation } from "../../../src/validation/validators/min-lenth/MinLengthValidation";

const makeSut = (field: string, minLength: number): MinLengthValidation => {
	return new MinLengthValidation(field, minLength);
};

describe("MinLengthValidation", () => {
	test("Deve retornar erro se o valor for inválido", () => {
		const field = faker.database.column();
		const sut = makeSut(field, 5);
		const error = sut.validate({ [field]: faker.random.alphaNumeric(3) });
		expect(error).toEqual(new InvalidParamError(field));
	});

	test("Deve retornar falso se o valor for válido", () => {
		const field = faker.database.column();
		const sut = makeSut("field", 5);
		const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
		expect(error).toBeFalsy();
	});

	test("Deve retornar falso o campo não existir no schema", () => {
		const sut = makeSut(faker.database.column(), 5);
		const error = sut.validate({
			[faker.database.column()]: faker.random.alphaNumeric(5),
		});
		expect(error).toBeFalsy();
	});
});
