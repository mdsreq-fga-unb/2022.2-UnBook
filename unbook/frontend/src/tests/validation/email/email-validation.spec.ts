import { InvalidParamError } from "../../../validation/errors/invalid-param-error";
import { EmailValidation } from "../../../validation/validators/email/email-validation";

describe("EmailValidation", () => {
	test("Deve retornar erro se o email for inválido", () => {
		const sut = new EmailValidation("email");
		const error = sut.validate(sut.field);
		expect(error).toEqual(new InvalidParamError("email"));
	});
});
