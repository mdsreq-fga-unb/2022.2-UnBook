import jwt from "jsonwebtoken";
import { JWTAdapter } from "../../../src/infra/criptography/JWTAdapter";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
}));

const makeSut = (): JWTAdapter => {
  return new JWTAdapter("secret_key");
};

describe("JWT Adapter", () => {
  test("Deve chamar o Sign com os valores corretos", async () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_value");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_value" }, "secret_key");
  });

  test("Deve retornar um token quando o sign tem sucesso", async () => {
    const sut = makeSut();
    const acesssToken = await sut.encrypt("any_value");
    expect(acesssToken).toBe("any_token");
  });

  test("Deve lançar um erro quando o sign retornar um erro", async () => {
    const sut = makeSut();
    jest.spyOn(jwt, "sign").mockImplementation(() => {
      throw new Error();
    });
    const promise = sut.encrypt("any_value");
    await expect(promise).rejects.toThrow();
  });
});