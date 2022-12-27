import bcrypt from "bcrypt";
import { BcryptAdapter } from "../../infra/criptography/BcryptAdapter";

jest.mock("bcrypt", () => {
  return {
    async hash(): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    },
  };
});

const makeSut = (): BcryptAdapter => {
  const salt = 12;
  return new BcryptAdapter(salt);
};

describe("Bcrypt Adapter", () => {
  test("Deve chamar o bcrypt com os valores corretos", async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("password");
    expect(hashSpy).toHaveBeenCalledWith("password", 12);
  });

  test("Deve retornar o password criptografado", async () => {
    const sut = makeSut();
    const hashed_password = await sut.encrypt("password");
    expect(hashed_password).toBe("hashed_password");
  });

  test("Deve retornar um erro quando o bcrypt falhar", async () => {
    const sut = makeSut();
    jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.encrypt("password");
    await expect(promise).rejects.toThrow();
  });
});
