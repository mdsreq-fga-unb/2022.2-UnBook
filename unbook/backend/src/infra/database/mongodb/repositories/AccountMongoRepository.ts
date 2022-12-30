/* eslint-disable no-underscore-dangle */
import { IAddAccountRepository } from "../../../../database/protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../../../../database/protocols/database/ILoadAccountByEmailRepository";
import {
  IAccountModel,
  IAddAccountModel,
} from "../../../../presentation/protocols/signup-protocols";
import { MongoHelper } from "../helpers/mongo-helper";

class AccountMongoRepository
  implements IAddAccountRepository, ILoadAccountByEmailRepository
{
  async add(accountData: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;
    const account = await accountCollection.findOne({ _id: id });

    if (account) {
      return {
        id: account._id.toString(),
        name: account.name,
        email: account.email,
        password: account.password,
      };
    }

    return null;
  }

  async loadByEmail(email: string): Promise<IAccountModel> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const account = await accountCollection.findOne({ email });
    if (account) {
      return {
        id: account._id.toString(),
        name: account.name,
        email: account.email,
        password: account.password,
      };
    }
    return null;
  }
}

export { AccountMongoRepository };
