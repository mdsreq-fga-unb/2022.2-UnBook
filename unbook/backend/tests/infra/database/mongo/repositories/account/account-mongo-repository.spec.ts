/* eslint-disable no-underscore-dangle */
import { Collection } from "mongodb";
import { MongoHelper } from "../../../../../../src/infra/database/mongodb/helpers/mongo-helper";
import { AccountMongoRepository } from "../../../../../../src/infra/database/mongodb/repositories/account/AccountMongoRepository";

let accountCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository();
  };

  describe("add()", () => {
    test("Deve retornar uma account quando add tiver sucesso", async () => {
      const sut = makeSut();
      const account = await sut.add({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });
  });

  describe("loadByEmail()", () => {
    test("Deve retornar uma account quando loadByEmail tiver sucesso", async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });
      const account = await sut.loadByEmail("any_email@mail.com");
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe("any_name");
      expect(account.email).toBe("any_email@mail.com");
      expect(account.password).toBe("any_password");
    });

    test("Deve retornar null se o loadByEmail falhar", async () => {
      const sut = makeSut();
      const account = await sut.loadByEmail("any_email@mail.com");
      expect(account).toBeFalsy();
    });
  });

  describe("updateAccessToken()", () => {
    test("Deve retornar um update do token de acesso quando o updateAcessToken tiver sucesso", async () => {
      const sut = makeSut();
      const result = await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });
      let account = await accountCollection.findOne({ _id: result.insertedId });
      expect(account.accessToken).toBeFalsy();
      await sut.updateAcessToken(result.insertedId.toString(), "any_token");
      account = await accountCollection.findOne({ _id: result.insertedId });
      expect(account).toBeTruthy();
      expect(account.accessToken).toEqual("any_token");
    });
  });
});
