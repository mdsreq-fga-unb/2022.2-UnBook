import {
  IAuthentication,
  IAuthenticationModel,
} from "../../domain/usecases/IAuthenticationUseCase";
import { IHashComparer } from "../protocols/criptography/IHashComparer";
import { ITokenGenerator } from "../protocols/criptography/ITokenGenerator";
import { IUpdateAccessTokenRepository } from "../protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../protocols/database/ILoadAccountByEmailRepository";

class AuthenticationRepository implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: IAuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(
      authentication.email
    );
    if (account) {
      const isValid = await this.hashComparer.compare(
        authentication.password,
        account.password
      );

      if (isValid) {
        const acessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, acessToken);
        return acessToken;
      }
    }
    return null;
  }
}

export { AuthenticationRepository };
