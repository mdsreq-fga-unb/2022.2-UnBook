import { SignUpController } from "../../modules/accounts/controllers/signup";
import { MissingParamError } from "../../modules/accounts/errors/missing-param-error";

describe("SignUp Controller", () => {
  test("Deve retornar 400 se o nome não for enviado", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("name"));
  });

  test("Deve retornar 400 se o email não for enviado", () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError("email"));
  });
});
