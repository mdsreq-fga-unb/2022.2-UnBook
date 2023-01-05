import { InvalidParamError } from "../../../validation/errors/invalid-param-error";
import { MinLengthValidation } from "../../../validation/validators/min-lenth/min-lenth-validadtion";

describe("MinLengthValidation", () => {
	test("Deve retornar erro se o valor for inválido", () => {
		const sut = new MinLengthValidation("field", 5);
		const error = sut.validate("123");
		expect(error).toEqual(new InvalidParamError("field"));
	});
});
