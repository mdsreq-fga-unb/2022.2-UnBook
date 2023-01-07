/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-underscore-dangle */
import { ObjectId } from "mongodb";
import {
  IAddAccountRepository,
  IUpdateAccessTokenRepository,
} from "../../../../data/protocols/database/data-sign-up-protocols";
import { ILoadAccountByEmailRepository } from "../../../../data/protocols/database/ILoadAccountByEmailRepository";
import {
  IAccountModel,
  IAddAccountModel,
} from "../../../../presentation/protocols/signup-protocols";
import { MongoHelper } from "../helpers/mongo-helper";

class AccountMongoRepository
  implements
    IAddAccountRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository
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

  async updateAcessToken(id: string, token: string): Promise<void> {
    const idObject = new ObjectId(id);
    const accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.updateOne(
      {
        _id: idObject,
      },
      {
        $set: {
          accessToken: token,
        },
      }
    );
  }
}

export { AccountMongoRepository };
