import { IDecrypter } from "../../../../src/data/protocols/criptography/IDecrypter";
import { LoadAccountByTokenRepository } from "../../../../src/data/repositories/LoadAccountByTokenRepository";

interface ISubTypes {
  sut: LoadAccountByTokenRepository;
  decrypterStub: IDecrypter;
}

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("any_value"));
    }
  }
  return new DecrypterStub();
};
const makeSut = (): ISubTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new LoadAccountByTokenRepository(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe("LoadAccountByTokenRepository", () => {
  test("Deve chamar o decrypter com os valores corretos", async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });
});
