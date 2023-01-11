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

  describe("POST /post", () => {
    test("Deve retornar 403 quando add post não tiver um accessToken", async () => {
      await request(app)
        .post("/api/post")
        .send({
          content: "any_content",
        })
        .expect(403);
    });
  });
});
