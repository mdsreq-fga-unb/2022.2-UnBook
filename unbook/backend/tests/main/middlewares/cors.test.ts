import request from "supertest";
import { app } from "../../../src/main/config/app";

describe("Cors Middleware", () => {
  test("Garante que a API possa ser acessada", async () => {
    app.post("/test_cors", (request, response) => {
      response.send();
    });

    await request(app)
      .get("/test_cors")
      .expect("access-control-allow-origin", "*")
      .expect("access-control-allow-methods", "*")
      .expect("access-control-allow-headers", "*");
  });
});
