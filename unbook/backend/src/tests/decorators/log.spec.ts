import { LogControllerDecorator } from "../../main/decorators/log";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../presentation/protocols";

describe("Log Controller Decorator", () => {
  test("Garante que o decorator chama o handle do controller", async () => {
    class ControllerStub implements IController {
      async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const httpResponse: IHttpResponse = {
          body: httpRequest.body,
          statusCode: 200,
        };
        return new Promise((resolve) => resolve(httpResponse));
      }
    }
    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    const sut = new LogControllerDecorator(controllerStub);
    const httpRequest = {
      body: {
        name: "any_name",
        email: "any_email",
        password: "any_password",
        passwordConfirmation: "any_password",
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    expect(controllerStub.handle).toHaveBeenCalledWith(httpRequest);
  });
});
