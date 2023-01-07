/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AddAccountRepository,
  IHasher,
  IAddAccountRepository,
} from "../../../../src/data/protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../../../../src/data/protocols/database/ILoadAccountByEmailRepository";
import {
  IAccountModel,
  IAddAccountModel,
} from "../../../../src/presentation/protocols/signup-protocols";

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "hashed_password",
  };
};

const makeAccountData = (): IAddAccountModel => {
  return {
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "valid_password",
  };
};

interface ISutTypes {
  sut: IAddAccountRepository;
  hasherStub: IHasher;
  addAccountRepositoryStub: IAddAccountRepository;
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository;
}

const makeEmcrypter = (): IHasher => {
  class HasherStub implements IHasher {
    hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new HasherStub();
};

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub
    implements ILoadAccountByEmailRepository
  {
    async loadByEmail(email: string): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new LoadAccountByEmailRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hasherStub = makeEmcrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new AddAccountRepository(
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  );
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe("AddAccount Repository UseCase", () => {
  test("Deve chamar o Hasher com o password correto", async () => {
    const { sut, hasherStub } = makeSut();
    const hasherSpy = jest.spyOn(hasherStub, "hash");
    await sut.add(makeAccountData());
    expect(hasherSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Deve lançar um erro se Hasher falhar", async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, "hash")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.add(makeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test("Deve chamar o AddAccountRepository com os valores corretos", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, "add");
    await sut.add(makeAccountData());
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email@mail.com",
      password: "hashed_password",
    });
  });

  test("Deve lançar um erro se AddAccountRepository falhar", async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest
      .spyOn(addAccountRepositoryStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.add(makeAccountData());
    await expect(promise).rejects.toThrow();
  });

  test("Deve retornar uma account quando for enviado os valores corretos", async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeAccountData());
    expect(account).toEqual(makeFakeAccount());
  });

  test("Deve garantir a chamada do LoadAccountByEmailRepository com o email correto", async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, "loadByEmail");
    await sut.add(makeAccountData());
    expect(loadSpy).toHaveBeenLastCalledWith("valid_email@mail.com");
  });
});
