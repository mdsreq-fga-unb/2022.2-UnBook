/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidParamError } from "../../../src/presentation/errors";
import { IEmailValidator } from "../../../src/presentation/protocols/signup-protocols";
import { EmailValidation } from "../../../src/validation/validators/EmailValidation";

interface ISutTypes {
  sut: EmailValidation;
  emailValidatorStub: IEmailValidator;
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation("email", emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe("Email Validation", () => {
  test("Deve retornar um erro se o EmailValidator retornar falso", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const error = sut.validate({ email: "any_email@mail.com" });
    expect(error).toEqual(new InvalidParamError("email"));
  });

  test("Deve chamar o EmailValidator com o email correto", () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    sut.validate({ email: "any_email@mail.com" });
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });

  test("Deve retornar um erro se o EmailValidator retornar um erro", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
