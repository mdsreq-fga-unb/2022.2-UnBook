import { hash } from "bcrypt";
import { Collection } from "mongodb";
import request from "supertest";
import { MongoHelper } from "../../infra/database/mongodb/helpers/mongo-helper";
import { app } from "../../main/config/app";

let accountCollection: Collection;

describe("Login Routes", () => {
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

  describe("POST/ signup", () => {
    test("Deve retornar 200 quando o signup tiver sucesso", async () => {
      await request(app)
        .post("/api/signup")
        .send({
          name: "any_name",
          email: "any_email@aluno.unb.br",
          password: "any_password",
          passwordConfirmation: "any_password",
        })
        .expect(200);
    });
  });

  describe("POST/ login", () => {
    test("Deve retornar 200 quando o login tiver sucesso", async () => {
      const password = await hash("any_password", 12);
      await accountCollection.insertOne({
        name: "any_name",
        email: "any_email@aluno.unb.br",
        password,
      });
      await request(app)
        .post("/api/login")
        .send({
          email: "any_email@aluno.unb.br",
          password: "any_password",
        })
        .expect(200);
    });
  });
});
