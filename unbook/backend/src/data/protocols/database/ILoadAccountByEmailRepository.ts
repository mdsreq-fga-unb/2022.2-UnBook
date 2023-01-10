import { IAccountModel } from "../../../presentation/protocols/signup-protocols";

interface ILoadAccountByEmailRepository {
  loadByEmail(email: string): Promise<IAccountModel>;
}

export { ILoadAccountByEmailRepository };
