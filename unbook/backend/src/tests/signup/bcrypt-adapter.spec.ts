import bcrypt from "bcrypt";
import { BcryptAdapter } from "../../modules/signup/infra/criptography/BcryptAdapter";

describe("Bcrypt Adapter", () => {
  test("Deve chamar o bcrypt com os valores corretos", async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, "hash");
    await sut.encrypt("password");
    expect(hashSpy).toHaveBeenCalledWith("password", 12);
  });
});
