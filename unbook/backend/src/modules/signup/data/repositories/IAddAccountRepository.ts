import {
  IAccountModel,
  IAddAccountModel,
} from "../../presentation/protocols/signup-protocols";

interface IAddAccountRepository {
  add(account: IAddAccountModel): Promise<IAccountModel>;
}

export { IAddAccountRepository };
