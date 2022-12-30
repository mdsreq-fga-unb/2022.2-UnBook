import jwt from "jsonwebtoken";
import { JWTAdapter } from "../../infra/criptography/JWTAdapter";

describe("JWT Adapter", () => {
  test("Deve chamar o Sign com os valores corretos", async () => {
    const sut = new JWTAdapter("secret_key");
    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_value");
    expect(signSpy).toHaveBeenCalledWith({ id: "any_value" }, "secret_key");
  });
});
