import { ILoadAccountByToken } from "../../domain/usecases/ILoadAccountByTokenUseCase";
import { IAccountModel } from "../protocols/criptography/db-authentication-protocols";
import { IDecrypter } from "../protocols/criptography/IDecrypter";

class LoadAccountByTokenRepository implements ILoadAccountByToken {
  constructor(private readonly decrypter: IDecrypter) {}

  async load(accessToken: string): Promise<IAccountModel> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}

export { LoadAccountByTokenRepository };
