import { faker } from "@faker-js/faker";
import { InvalidParamError } from "../../../src/validation/errors/InvalidParamError";
import { MinLengthValidation } from "../../../src/validation/validators/min-lenth/MinLengthValidation";

const makeSut = (
	field = faker.database.column(),
	minLength: number
): MinLengthValidation => {
	return new MinLengthValidation(field, minLength);
};

describe("MinLengthValidation", () => {
	test("Deve retornar erro se o valor for inválido", () => {
		const sut = makeSut("field", 5);
		const error = sut.validate(faker.random.alphaNumeric(3));
		expect(error).toEqual(new InvalidParamError("field"));
	});

	test("Deve retornar falso se o valor for válido", () => {
		const sut = makeSut("field", 5);
		const error = sut.validate(faker.random.alphaNumeric(5));
		expect(error).toBeFalsy();
	});
});
