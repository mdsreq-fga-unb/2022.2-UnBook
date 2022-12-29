/* eslint-disable no-underscore-dangle */
import { IAddAccountRepository } from "../../../../database/protocols/data-sign-up-protocols";
import {
  IAccountModel,
  IAddAccountModel,
} from "../../../../presentation/protocols/signup-protocols";
import { MongoHelper } from "../helpers/mongo-helper";

class AccountMongoRepository implements IAddAccountRepository {
  async add(accountData: IAddAccountModel): Promise<any> {
    const accountCollection = MongoHelper.getCollection("accounts");
    const result = await accountCollection.insertOne(accountData);
    const id = result.insertedId;
    const account = await accountCollection.findOne({ _id: id });

    if (account !== null) {
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
