import validator from "validator";
import { EmailValidatorAdapter } from "../../main/adapters/validators/EmailValidatorAdapter";

jest.mock("validator", () => {
  return {
    isEmail(): boolean {
      return true;
    },
  };
});

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("EmailValidator Adapter", () => {
  test("Deve retornar falso se a validação de email retornar falso", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Deve retornar verdadeiro se a validação de email retornar verdadeiro", () => {
    const sut = makeSut();
    const isValid = sut.isValid("any_email@aluno.unb.br");
    expect(isValid).toBe(true);
  });

  test("Deve retornar falso se o email enviado não possuir o domínio @aluno.unb.br", () => {
    const sut = makeSut();
    const isValid = sut.isValid("any_email@mail.com");
    expect(isValid).toBe(false);
  });

  test("Deve chamar o email validator com um email correto", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@mail.com");
    expect(isEmailSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
