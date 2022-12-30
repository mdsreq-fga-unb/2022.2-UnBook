/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHashComparer } from "../../database/protocols/criptography/IHashComparer";
import { ITokenGenerator } from "../../database/protocols/criptography/ITokenGenerator";
import { IUpdateAccessTokenRepository } from "../../database/protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../../database/protocols/database/ILoadAccountByEmailRepository";
import { AuthenticationRepository } from "../../database/repositories/AuthenticationRepository";
import { IAccountModel } from "../../domain/models/AccountModel";
import { IAuthenticationModel } from "../../domain/usecases/IAuthenticationUseCase";

const makeFaceAccount = (): IAccountModel => {
  return {
    id: "any_id",
    name: "any_name",
    email: "any_email@mail.com",
    password: "hashed_password",
  };
};

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository
  {
    async load(email: string): Promise<IAccountModel | null> {
      return new Promise((resolve) => resolve(makeFaceAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeFakeAuthentication = (): IAuthenticationModel => {
  return {
    email: "any_email@mail.com",
    password: "any_password",
  };
};

const makeHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HashComparerStub();
};

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    async generate(id: string): Promise<string> {
      return new Promise((resolve) => resolve("any_token"));
    }
  }
  return new TokenGeneratorStub();
};

const makeUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAcessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new UpdateAcessTokenRepositoryStub();
};

interface ISutTypes {
  sut: AuthenticationRepository;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
  hashComparerStub: IHashComparer;
  tokenGeneratorStub: ITokenGenerator;
  updtadeAcessTokenRepositoryStub: IUpdateAccessTokenRepository;
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const tokenGeneratorStub = makeTokenGenerator();
  const updtadeAcessTokenRepositoryStub = makeUpdateAccessTokenRepository();
  const sut = new AuthenticationRepository(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updtadeAcessTokenRepositoryStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updtadeAcessTokenRepositoryStub,
  };
};

describe("Authentication Repository", () => {
  test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "load");
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenLastCalledWith("any_email@mail.com");
  });

  test("Deve lançar um erro se o LoadAccountByEmailRepository lançar um erro", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Deve retornar null se LoadAccountByEmailRepository retornar null", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, "load")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const acessToken = await sut.auth(makeFakeAuthentication());
    expect(acessToken).toBeNull();
  });

  test("Deve chamar o HashComparer com os valores corretos", async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, "compare");
    await sut.auth(makeFakeAuthentication());
    expect(compareSpy).toHaveBeenLastCalledWith(
      "any_password",
      "hashed_password"
    );
  });

  test("Deve lançar um erro se o HashComparer lançar um erro", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Deve retornar null se HashComparer retornar false", async () => {
    const { sut, hashComparerStub } = makeSut();
    jest
      .spyOn(hashComparerStub, "compare")
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));
    const acessToken = await sut.auth(makeFakeAuthentication());
    expect(acessToken).toBeNull();
  });

  test("Deve chamar o TokenGenerator com o id correto", async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    const generateSpy = jest.spyOn(tokenGeneratorStub, "generate");
    await sut.auth(makeFakeAuthentication());
    expect(generateSpy).toHaveBeenLastCalledWith("any_id");
  });

  test("Deve lançar um erro se o TokenGenerator lançar um erro", async () => {
    const { sut, tokenGeneratorStub } = makeSut();
    jest
      .spyOn(tokenGeneratorStub, "generate")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });

  test("Deve chamar o TokenGenerator com o id correto", async () => {
    const { sut } = makeSut();
    const acessToken = await sut.auth(makeFakeAuthentication());
    expect(acessToken).toBe("any_token");
  });

  test("Deve chamar o UpdateAcessTokenRepository com os valores corretos", async () => {
    const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
    const updateSpy = jest.spyOn(updtadeAcessTokenRepositoryStub, "update");
    await sut.auth(makeFakeAuthentication());
    expect(updateSpy).toHaveBeenLastCalledWith("any_id", "any_token");
  });

  test("Deve lançar um erro se o UpdateAcessTokenRepository lançar um erro", async () => {
    const { sut, updtadeAcessTokenRepositoryStub } = makeSut();
    jest
      .spyOn(updtadeAcessTokenRepositoryStub, "update")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.auth(makeFakeAuthentication());
    await expect(promise).rejects.toThrow();
  });
});
