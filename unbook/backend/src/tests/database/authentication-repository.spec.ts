/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IHashComparer } from "../../database/protocols/criptography/IHashComparer";
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

interface ISutTypes {
  sut: AuthenticationRepository;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
  hashComparerStub: IHashComparer;
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hashComparerStub = makeHashComparer();
  const sut = new AuthenticationRepository(
    loadAccountByEmailRepositoryStub,
    hashComparerStub
  );
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
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
});
