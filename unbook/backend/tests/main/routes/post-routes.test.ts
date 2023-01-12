/* eslint-disable no-underscore-dangle */
import { sign } from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../../src/infra/database/mongodb/helpers/mongo-helper";
import { app } from "../../../src/main/config/app";
import env from "../../../src/main/config/env";

let postCollection: Collection;
let accountCollection: Collection;

describe("Post Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    postCollection = MongoHelper.getCollection("posts");
    await postCollection.deleteMany({});
    accountCollection = MongoHelper.getCollection("accounts");
    await accountCollection.deleteMany({});
  });

  describe("POST /post", () => {
    test("Deve retornar 403 quando add post não tiver um accessToken", async () => {
      await request(app)
        .post("/api/posts")
        .send({
          content: "any_content",
        })
        .expect(403);
    });

    test("Deve retornar 204 quando add post tiver um accessToken", async () => {
      const result = await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
      });
      const objectId = result.insertedId;
      const id = objectId.toHexString();
      const accessToken = sign({ id }, env.jwtSecret);
      await accountCollection.updateOne(
        { _id: objectId },
        {
          $set: {
            accessToken,
          },
        }
      );
      await request(app)
        .post("/api/posts")
        .set("x-access-token", accessToken)
        .send({
          content: "any_content",
        })
        .expect(204);
    });
  });

  describe("POST /post", () => {
    test("Deve retornar 403 quando não tiver um accessToken", async () => {
      await request(app).get("/api/posts").expect(403);
    });

    // test("Deve retornar 204 quando add post tiver um accessToken", async () => {
    //   const result = await accountCollection.insertOne({
    //     name: "any_name",
    //     email: "any_email@mail.com",
    //     password: "any_password",
    //   });
    //   const objectId = result.insertedId;
    //   const id = objectId.toHexString();
    //   const accessToken = sign({ id }, env.jwtSecret);
    //   await accountCollection.updateOne(
    //     { _id: objectId },
    //     {
    //       $set: {
    //         accessToken,
    //       },
    //     }
    //   );
    //   await request(app)
    //     .post("/api/posts")
    //     .set("x-access-token", accessToken)
    //     .send({
    //       content: "any_content",
    //     })
    //     .expect(204);
    // });
  });
});
