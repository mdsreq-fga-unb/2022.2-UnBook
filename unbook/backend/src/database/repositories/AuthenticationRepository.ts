import {
  IAuthentication,
  IAuthenticationModel,
} from "../../domain/usecases/IAuthenticationUseCase";
import { ILoadAccountByEmailRepository } from "../protocols/database/ILoadAccountByEmailRepository";

class AuthenticationRepository implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async auth(authentication: IAuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email);
    return null;
  }
}

export { AuthenticationRepository };
