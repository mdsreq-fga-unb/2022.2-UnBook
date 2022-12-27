import request from "supertest";
import { app } from "../../main/config/app";

describe("SignUp Routes", () => {
  test("Garante que o retorno seja uma conta", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "any_name",
        email: "any_email@mail.com",
        password: "any_password",
        passwordConfirmation: "any_password",
      })
      .expect(200);
  });
});
