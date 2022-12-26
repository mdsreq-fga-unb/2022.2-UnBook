import bcrypt from "bcrypt";
import { IEncrypter } from "../../data/protocols/data-sign-up-protocols";

class BcryptAdapter implements IEncrypter {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  async encrypt(password: string): Promise<any> {
    await bcrypt.hash(password, this.salt);
    return null;
  }
}

export { BcryptAdapter };
