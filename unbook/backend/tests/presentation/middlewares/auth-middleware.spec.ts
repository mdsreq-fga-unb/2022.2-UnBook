/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAccountModel } from "../../../src/domain/models/AccountModel";
import { ILoadAccountByToken } from "../../../src/domain/usecases/ILoadAccountByTokenUseCase";
import { AccessDeniedError } from "../../../src/presentation/errors/access-denied-error";
import { forbidden } from "../../../src/presentation/helpers/http/http-helper";
import { AuthMiddleware } from "../../../src/presentation/middlewares/AuthMiddleware";

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "hashed_password",
  };
};

describe("Auth Middleware", () => {
  test("Deve retornar 403 se o accessToken não for encontrdo no headers", async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<IAccountModel> {
        return new Promise((resolve) => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Deve chamar o LoadAccountByToken com o accessToken correto", async () => {
    class LoadAccountByTokenStub implements ILoadAccountByToken {
      async load(accessToken: string, role?: string): Promise<IAccountModel> {
        return new Promise((resolve) => resolve(makeFakeAccount()));
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");
    const sut = new AuthMiddleware(loadAccountByTokenStub);
    await sut.handle({
      headers: {
        "x-access-token": "any_token",
      },
    });
    expect(loadSpy).toHaveBeenCalledWith("any_token");
  });
});
