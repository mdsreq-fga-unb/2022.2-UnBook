import bcrypt from "bcrypt";
import { IEncrypter } from "../../database/protocols/data-sign-up-protocols";

class BcryptAdapter implements IEncrypter {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  async encrypt(password: string): Promise<string> {
    const hashed_password = await bcrypt.hash(password, this.salt);
    return hashed_password;
  }
}

export { BcryptAdapter };
