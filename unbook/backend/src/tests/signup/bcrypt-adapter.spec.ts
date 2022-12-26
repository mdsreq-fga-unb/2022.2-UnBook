import bcrypt from "bcrypt";
import { BcryptAdapter } from "../../modules/signup/infra/criptography/BcryptAdapter";

jest.mock("bcrypt", () => {
  return {
    async hash(): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    },
  };
});

describe("Bcrypt Adapter", () => {
  test("Deve chamar o bcrypt com os valores corretos", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("password");
    expect(hashSpy).toHaveBeenCalledWith("password", 12);
  });

  test("Deve retornar o password criptografado", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashed_password = await sut.encrypt("password");
    expect(hashed_password).toBe("hashed_password");
  });
});
