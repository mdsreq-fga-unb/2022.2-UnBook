import jwt from "jsonwebtoken";
import { JWTAdapter } from "../../infra/criptography/JWTAdapter";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
}));

describe("JWT Adapter", () => {
  test("Deve chamar o Sign com os valores corretos", async () => {
    const sut = new JWTAdapter("secret_key");
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_value");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_value" }, "secret_key");
  });

  test("Deve retornar um token quando o sign tem sucesso", async () => {
    const sut = new JWTAdapter("secret_key");
    const acesssToken = await sut.encrypt("any_value");
    expect(acesssToken).toBe("any_token");
  });
});
