import { LoginController } from "../../presentation/controllers/LogInController";
import { MissingParamError } from "../../presentation/errors";
import { badRequest } from "../../presentation/helpers/http-helper";

interface ISubTypes {
  sut: LoginController;
}

const makeSut = (): ISubTypes => {
  const sut = new LoginController();
  return {
    sut,
  };
};

describe("SignUp Controller", () => {
  test("Deve retornar 400 se o email não for fornecido", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Deve retornar 400 se a senha não for fornecida", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });
});
