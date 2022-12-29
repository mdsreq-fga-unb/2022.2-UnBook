/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginController } from "../../presentation/controllers/LogInController";
import {
  InvalidParamError,
  MissingParamError,
} from "../../presentation/errors";
import { badRequest } from "../../presentation/helpers/http-helper";
import {
  IEmailValidator,
  IHttpRequest,
} from "../../presentation/protocols/signup-protocols";

interface ISubTypes {
  sut: LoginController;
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

const makeSut = (): ISubTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new LoginController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

const makeFakeRequest = (): IHttpRequest => {
  return {
    body: {
      email: "any_email@mail.com",
      password: "any_password",
    },
  };
};

describe("SignUp Controller", () => {
  test("Deve retornar 400 se o email não for fornecido", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    delete httpRequest.body.email;
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Deve retornar 400 se a senha não for fornecida", async () => {
    const { sut } = makeSut();
    const httpRequest = makeFakeRequest();
    delete httpRequest.body.password;
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });

  test("Deve retornar 400 se o email fornecido for inválido", async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, "isValid").mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError("email")));
  });

  test("Deve chamar o EmailValidator com o email correto", async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, "isValid");
    await sut.handle(makeFakeRequest());
    expect(isValidSpy).toHaveBeenCalledWith("any_email@mail.com");
  });
});
