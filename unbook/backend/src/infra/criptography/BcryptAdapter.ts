import bcrypt from "bcrypt";
import { IHasher } from "../../database/protocols/database/data-sign-up-protocols";

class BcryptAdapter implements IHasher {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  async hash(password: string): Promise<string> {
    const hashed_password = await bcrypt.hash(password, this.salt);
    return hashed_password;
  }
}

export { BcryptAdapter };
