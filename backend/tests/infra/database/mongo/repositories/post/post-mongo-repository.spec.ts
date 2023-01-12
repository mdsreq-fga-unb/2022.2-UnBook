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

  describe("Add", () => {
    test("Deve adicionar um post quando tiver sucesso", async () => {
      const sut = makeSut();
      await sut.add({
        content: "any_content",
        date: new Date(),
      });
      const post = await postCollection.findOne({ content: "any_content" });
      expect(post).toBeTruthy();
    });
  });

  describe("loadAll", () => {
    test("Deve carregar todos os posts quando tiver sucesso", async () => {
      await postCollection.insertMany([
        {
          content: "any_content",
          date: new Date(),
        },
        {
          content: "other_content",
          date: new Date(),
        },
      ]);
      const sut = makeSut();
      const posts = await sut.loadAll();
      expect(posts.length).toBe(2);
      expect(posts[0].content).toBe("any_content");
      expect(posts[1].content).toBe("other_content");
    });

    test("Deve retornar uma lista vazia", async () => {
      const sut = makeSut();
      const posts = await sut.loadAll();
      expect(posts.length).toBe(0);
    });
  });
});
