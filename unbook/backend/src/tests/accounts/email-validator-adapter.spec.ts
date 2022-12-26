import { EmailValidatorAdapter } from "../../modules/accounts/utils/EmailValidatorAdapter";

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se a validação de email retornar falso", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });
});
