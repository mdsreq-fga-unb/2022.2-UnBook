import { faker } from "@faker-js/faker";
import { InvalidParamError } from "../../../validation/errors/invalid-param-error";
import { MinLengthValidation } from "../../../validation/validators/min-lenth/min-lenth-validadtion";

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
