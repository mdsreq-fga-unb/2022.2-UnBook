import bcrypt from "bcrypt";
import { IHashComparer } from "../../database/protocols/criptography/db-authentication-protocols";
import { IHasher } from "../../database/protocols/database/data-sign-up-protocols";

class BcryptAdapter implements IHasher, IHashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  async hash(password: string): Promise<string> {
    const hashed_password = await bcrypt.hash(password, this.salt);
    return hashed_password;
  }
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}

export { BcryptAdapter };
