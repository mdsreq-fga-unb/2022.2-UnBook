import validator from "validator";
import { EmailValidatorAdapter } from "../../modules/accounts/utils/EmailValidatorAdapter";

jest.mock("validator", () => {
  return {
    isEmail(): boolean {
      return true;
    },
  };
});

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se a validação de email retornar falso", () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Deve retornar verdadeiro se a validação de email retornar verdadeiro", () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid("valid_email@mail.com");
    expect(isValid).toBe(true);
  });

  test("Deve chamar o email validator com um email correto", () => {
    const sut = new EmailValidatorAdapter();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
