import { IDecrypter } from "../../../../src/data/protocols/criptography/IDecrypter";
import { LoadAccountByTokenRepository } from "../../../../src/data/repositories/LoadAccountByTokenRepository";

describe("LoadAccountByTokenRepository", () => {
  test("Deve chamar o decrypter com os valores corretos", async () => {
    class DecrypterStub implements IDecrypter {
      async decrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve("any_value"));
      }
    }
    const decrypterStub = new DecrypterStub();
    const decryptSpy = jest.spyOn(decrypterStub, "decrypt");
    const sut = new LoadAccountByTokenRepository(decrypterStub);
    await sut.load("any_token");
    expect(decryptSpy).toHaveBeenCalledWith("any_token");
  });
});
