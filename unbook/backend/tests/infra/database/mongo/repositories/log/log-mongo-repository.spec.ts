import { Collection } from "mongodb";
import { MongoHelper } from "../../../../../../src/infra/database/mongodb/helpers/mongo-helper";
import { LogMongoRepository } from "../../../../../../src/infra/database/mongodb/repositories/log/LogMongoRepository";

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe("Log Mongo Repository", () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = MongoHelper.getCollection("errors");
    await errorCollection.deleteMany({});
  });

  test("Devia criar um log de erro com sucesso", async () => {
    const sut = makeSut();
    await sut.logError("any_error");
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
