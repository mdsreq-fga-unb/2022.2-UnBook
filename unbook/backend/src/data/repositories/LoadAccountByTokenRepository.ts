import { ILoadAccountByToken } from "../../domain/usecases/ILoadAccountByTokenUseCase";
import { IAccountModel } from "../protocols/criptography/db-authentication-protocols";
import { IDecrypter } from "../protocols/criptography/IDecrypter";
import { ILoadAccountByTokenRepository } from "../protocols/database/account/ILoadAccountByTokenRepository";

class LoadAccountByTokenRepository implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load(accessToken: string): Promise<IAccountModel> {
    const token = await this.decrypter.decrypt(accessToken);
    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken);
    }
    return null;
  }
}

export { LoadAccountByTokenRepository };
