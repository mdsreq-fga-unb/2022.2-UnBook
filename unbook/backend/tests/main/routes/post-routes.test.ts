import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../../src/infra/database/mongodb/helpers/mongo-helper";
import { app } from "../../../src/main/config/app";

let postCollection: Collection;

describe("Login Routes", () => {
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

  describe("POST /posts", () => {
    test("Deve retornar 200 quando o signup tiver sucesso", async () => {
      await request(app)
        .post("/api/posts")
        .send({
          content: "any_content",
        })
        .expect(204);
    });
  });
});
