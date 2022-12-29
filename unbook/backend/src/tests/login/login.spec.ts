import { LoginController } from "../../presentation/controllers/LogInController";
import { MissingParamError } from "../../presentation/errors";
import { badRequest } from "../../presentation/helpers/http-helper";

describe("SignUp Controller", () => {
  test("Deve retornar 400 se o email não for fornecido", async () => {
    const sut = new LoginController();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });
});
