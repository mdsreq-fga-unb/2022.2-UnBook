/* eslint-disable max-classes-per-file */
import { IEncrypter } from "../../modules/signup/data/protocols/encrypter";
import { DbAddAccount } from "../../modules/signup/data/repositories/DbAddAccount";

interface ISutTypes {
  sut: DbAddAccount;
  encrypterStub: IEncrypter;
}

const makeSut = (): ISutTypes => {
  class EncrypterStub {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }

  const encrypterStub = new EncrypterStub();
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
});
