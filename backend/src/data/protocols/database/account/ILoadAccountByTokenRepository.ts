import { IAccountModel } from "../../../../presentation/protocols/signup-protocols";

interface ILoadAccountByTokenRepository {
  loadByToken(token: string): Promise<IAccountModel>;
}

export { ILoadAccountByTokenRepository };
