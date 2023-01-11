/* eslint-disable no-underscore-dangle */
import { Collection } from "mongodb";
import { MongoHelper } from "../../../../../../src/infra/database/mongodb/helpers/mongo-helper";
import { PostMongoRepository } from "../../../../../../src/infra/database/mongodb/repositories/posts/PostMongoRepository";

let postCollection: Collection;

describe("Account Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    postCollection = MongoHelper.getCollection("posts");
    await postCollection.deleteMany({});
  });

  const makeSut = (): PostMongoRepository => {
    return new PostMongoRepository();
  };

  test("Deve adicionar um post quando tiver sucesso", async () => {
    const sut = makeSut();
    await sut.add({
      content: "any_content",
    });
    const post = await postCollection.findOne({ content: "any_content" });
    expect(post).toBeTruthy();
  });
});
