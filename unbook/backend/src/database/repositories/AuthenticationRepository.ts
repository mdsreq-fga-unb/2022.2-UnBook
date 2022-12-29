import {
  IAuthentication,
  IAuthenticationModel,
} from "../../domain/usecases/IAuthenticationUseCase";
import { IHashComparer } from "../protocols/criptography/IHashComparer";
import { ILoadAccountByEmailRepository } from "../protocols/database/ILoadAccountByEmailRepository";

class AuthenticationRepository implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
  }

  async auth(authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      await this.hashComparer.compare(
        authentication.password,
        account.password
      );
    }
    return null;
  }
}

export { AuthenticationRepository };
