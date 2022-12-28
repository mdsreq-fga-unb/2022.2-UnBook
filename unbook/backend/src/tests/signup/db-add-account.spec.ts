/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AddAccountRepository,
  IEncrypter,
  IAddAccountRepository,
} from "../../database/protocols/data-sign-up-protocols";
import {
  IAccountModel,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email",
    password: "hashed_password",
  };
};

const makeAccountData = (): IAddAccountModel => {
  return {
    name: "valid_name",
    email: "valid_email",
    password: "valid_password",
  };
};

interface ISutTypes {
  sut: IAddAccountRepository;
  encrypterStub: IEncrypter;
  addAccountRepositoryStub: IAddAccountRepository;
}

const makeEmcrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

const makeAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add(account: IAddAccountModel): Promise<IAccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new AddAccountRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEmcrypter();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new AddAccountRepository(encrypterStub, addAccountRepositoryStub);
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  };
};

describe("AddAccount Repository UseCase", () => {
  test("Deve chamar o Encrypter com o password correto", async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, "encrypt");
    await sut.add(makeAccountData());
    expect(encrypterSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Deve lançar um erro se Encrypter falhar", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
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
      email: "valid_email",
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
});
