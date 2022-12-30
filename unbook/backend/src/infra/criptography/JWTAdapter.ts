import jwt from "jsonwebtoken";
import { IEncrypter } from "../../database/protocols/criptography/db-authentication-protocols";

class JWTAdapter implements IEncrypter {
  constructor(private readonly secret: string) {
    this.secret = secret;
  }
  async encrypt(value: string): Promise<string> {
    const acessToken = jwt.sign({ id: value }, this.secret);
    return acessToken;
  }
}

export { JWTAdapter };
