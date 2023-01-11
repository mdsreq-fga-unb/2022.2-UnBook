/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAccountModel } from "../../../src/domain/models/AccountModel";
import { ILoadAccountByToken } from "../../../src/domain/usecases/ILoadAccountByTokenUseCase";
import { AccessDeniedError } from "../../../src/presentation/errors/access-denied-error";
import {
  forbidden,
  ok,
} from "../../../src/presentation/helpers/http/http-helper";
import { AuthMiddleware } from "../../../src/presentation/middlewares/AuthMiddleware";
import { IHttpRequest } from "../../../src/presentation/protocols";

const makeFakeRequest = (): IHttpRequest => {
  return {
    headers: {
      "x-access-token": "any_token",
    },
  };
};

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "hashed_password",
  };
};

interface ISutTypes {
  sut: AuthMiddleware;
  loadAccountByTokenStub: ILoadAccountByToken;
}

const makeLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByTokenStub();
};

const makeSut = (): ISutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe("Auth Middleware", () => {
  test("Deve retornar 403 se o accessToken não for encontrdo no headers", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Deve chamar o LoadAccountByToken com o accessToken correto", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByTokenStub, "load");
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith("any_token");
  });

  test("Deve retornar 403 se o LoadAccountByToken retornar null", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenStub, "load")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  test("Deve retornar 200 se o LoadAccountBuToken retornar uma conta", async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: "valid_id" }));
  });
});
