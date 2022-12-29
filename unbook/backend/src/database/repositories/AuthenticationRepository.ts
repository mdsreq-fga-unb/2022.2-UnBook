import {
  IAuthentication,
  IAuthenticationModel,
} from "../../domain/usecases/IAuthenticationUseCase";
import { ILoadAccountByEmailRepository } from "../protocols/LoadAccountByEmailRepository";

class AuthenticationRepository implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(
    authentication: IAuthenticationModel
  ): Promise<string | undefined> {
    await this.loadAccountByEmailRepository.load(authentication.email);
    return undefined;
  }
}

export { AuthenticationRepository };
