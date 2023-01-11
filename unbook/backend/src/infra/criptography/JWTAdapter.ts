import jwt from "jsonwebtoken";
import { IEncrypter } from "../../data/protocols/criptography/db-authentication-protocols";
import { IDecrypter } from "../../data/protocols/criptography/IDecrypter";

class JWTAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {
    this.secret = secret;
  }
  async encrypt(value: string): Promise<string> {
    const acessToken = jwt.sign({ id: value }, this.secret);
    return acessToken;
  }

  async decrypt(value: string): Promise<string> {
    const valueDecrypted = jwt.verify(value, this.secret);
    return valueDecrypted as string;
  }
}

export { JWTAdapter };
