/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-classes-per-file */
import { IDecrypter } from "../../../../src/data/protocols/criptography/IDecrypter";
import { ILoadAccountByTokenRepository } from "../../../../src/data/protocols/database/account/ILoadAccountByTokenRepository";
import { LoadAccountByTokenRepository } from "../../../../src/data/repositories/LoadAccountByTokenRepository";
import { IAccountModel } from "../../../../src/domain/models/AccountModel";

interface ISubTypes {
  sut: LoadAccountByTokenRepository;
  decrypterStub: IDecrypter;
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository;
}

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("any_value"));
    }
  }
  return new DecrypterStub();
};

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "hashed_password",
  };
};

const makeLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
    implements ILoadAccountByTokenRepository
  {
    async loadByToken(token: string): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = (): ISubTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
  const sut = new LoadAccountByTokenRepository(
    decrypterStub,
    loadAccountByTokenRepositoryStub
  );
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub,
  };
};

describe("LoadAccountByTokenRepository", () => {
  test("Deve chamar o decrypter com os valores corretos", async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });

  test("Deve chamar null se o decrypter retornar null", async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, "decrypt")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const account = await sut.load("any_token");
    expect(account).toBeNull();
  });

  test("Deve chamar o LoadAccountByTokenRepository com os valores corretos", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(
      loadAccountByTokenRepositoryStub,
      "loadByToken"
    );
    await sut.load("any_token");
    expect(loadByTokenSpy).toHaveBeenCalledWith("any_token");
  });

  test("Deve retornar null se o LoadAccountByTokenRepository retornar null", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const account = await sut.load("any_token");
    expect(account).toBeNull();
  });

  test("Deve retornar um account se tiver sucesso", async () => {
    const { sut } = makeSut();
    const account = await sut.load("any_token");
    expect(account).toEqual(makeFakeAccount());
  });

  test("Deve lançar um erro se o Decrypter falhar", async () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, "decrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });

  test("Deve lançar um erro se o LoadAccountByTokenRepository falhar", async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByTokenRepositoryStub, "loadByToken")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.load("any_token");
    await expect(promise).rejects.toThrow();
  });
});
