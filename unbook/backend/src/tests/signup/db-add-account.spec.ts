/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEncrypter } from "../../modules/signup/data/protocols/encrypter";
import { DbAddAccount } from "../../modules/signup/data/repositories/DbAddAccount";

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeEmcrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): ISutTypes => {
  const encrypterStub = makeEmcrypter();
  const sut = new DbAddAccount(encrypterStub);
  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddAccount UseCase", () => {
  test("Deve chamar o Encrypter com o password correto", async () => {
    const { sut, encrypterStub } = makeSut();
    const encrypterSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encrypterSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Deve lançar um erro se Encrypter falhar", async () => {
    const { sut, encrypterStub } = makeSut();
    jest
      .spyOn(encrypterStub, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );

    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow(new Error());
  });
});
