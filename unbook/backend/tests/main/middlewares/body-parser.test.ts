import request from "supertest";
import { app } from "../../../src/main/config/app";

describe("Body Parser Middleware", () => {
  test("Should parse body as json", async () => {
    app.post("/test_body_parser", (request, response) => {
      response.send(request.body);
    });

    await request(app)
      .post("/test_body_parser")
      .send({ name: "John Doe" })
      .expect({ name: "John Doe" });
  });
});
