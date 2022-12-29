import { IAccountModel } from "../../../presentation/protocols/signup-protocols";

interface ILoadAccountByEmailRepository {
  load(email: string): Promise<IAccountModel>;
}

export { ILoadAccountByEmailRepository };
