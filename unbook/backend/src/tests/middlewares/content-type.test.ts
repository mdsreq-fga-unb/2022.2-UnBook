import request from "supertest";
import { app } from "../../main/config/app";

describe("Cors Middleware", () => {
  test("Garante que o retorno seja por padrão do tipo json", async () => {
    app.get("/test_content_type", (request, response) => {
      response.send("");
    });
    await request(app).get("/test_content_type").expect("content-type", /json/);
  });

  test("Garante que seja possível forçar o envio da requisição com tipo XML ", async () => {
    app.get("/test_content_type_xml", (request, response) => {
      response.type("xml");
      response.send("");
    });
    await request(app)
      .get("/test_content_type_xml")
      .expect("content-type", /xml/);
  });
});
