import { AccessDeniedError } from "../../../src/presentation/errors/access-denied-error";
import { forbidden } from "../../../src/presentation/helpers/http/http-helper";
import { AuthMiddleware } from "../../../src/presentation/middlewares/AuthMiddleware";

describe("Auth Middleware", () => {
  test("Deve retornar 403 se o accessToken não for encontrdo no headers", async () => {
    const sut = new AuthMiddleware();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
