import {
  IAuthentication,
  IAuthenticationModel,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository,
  ILoadAccountByEmailRepository,
} from "../protocols/criptography/db-authentication-protocols";

class AuthenticationRepository implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashComparer = hashComparer;
    this.encrypter = encrypter;
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
        const acessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.update(account.id, acessToken);
        return acessToken;
      }
    }
    return null;
  }
}

export { AuthenticationRepository };
