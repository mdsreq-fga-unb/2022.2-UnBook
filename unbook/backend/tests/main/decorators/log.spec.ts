/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILogErrorRepository } from "../../../src/data/protocols/database/ILogErrorRepository";
import { IAccountModel } from "../../../src/domain/models/AccountModel";
import { LogControllerDecorator } from "../../../src/main/decorators/LogControllerDecorator";
import {
  serverError,
  ok,
} from "../../../src/presentation/helpers/http/http-helper";
import {
  IController,
  IHttpRequest,
  IHttpResponse,
} from "../../../src/presentation/protocols";

const makeFakeRequest = (): IHttpRequest => {
  return {
    body: {
      name: "any_name",
      email: "any_email@mail.com",
      password: "any_password",
      passwordConfirmation: "any_password",
    },
  };
};

const makeFakeAccount = (): IAccountModel => {
  return {
    id: "valid_id",
    name: "valid_name",
    email: "valid_email@mail.com",
    password: "valid_password",
  };
};

const makeFakeServerError = (): IHttpResponse => {
  const fakeError = new Error();
  fakeError.stack = "any_stack";
  return serverError(fakeError);
};

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      return new Promise((resolve) => resolve(ok(makeFakeAccount())));
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError(stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new LogErrorRepositoryStub();
};

interface ISutTypes {
  sut: LogControllerDecorator;
  controllerStub: IController;
  logErrorRepositoryStub: ILogErrorRepository;
}

const makeSut = (): ISutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub,
  };
};

describe("Log Controller Decorator", () => {
  test("Garante que o decorator chama o handle do controller", async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    expect(controllerStub.handle).toHaveBeenCalledWith(httpRequest);
  });

  test("Deve retornar o mesmo resultado do controller", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok(makeFakeAccount()));
  });

  test("Deve chamar LogErrorRepository com o erro correto se o controller retornar um ServerError", async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const handleSpy = jest
      .spyOn(controllerStub, "handle")
      .mockReturnValueOnce(
        new Promise((resolve) => resolve(makeFakeServerError()))
      );
    const logSpy = jest.spyOn(logErrorRepositoryStub, "logError");
    await sut.handle(makeFakeRequest());
    expect(logSpy).toBeCalledWith("any_stack");
  });
});
