/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { faker } from "@faker-js/faker";
import MockDate from "mockdate";
import {
  IAddPost,
  IAddPostModel,
} from "../../../src/domain/usecases/IAddPostUseCase";
import { AddPostController } from "../../../src/presentation/controllers/post/AddPostController";
import {
  badRequest,
  noContent,
  serverError,
} from "../../../src/presentation/helpers/http/http-helper";
import { IHttpRequest } from "../../../src/presentation/protocols";
import { IValidation } from "../../../src/validation/protocols/IValidation";

interface ISubTypes {
  sut: AddPostController;
  validationStub: IValidation;
  addPostStub: IAddPost;
}

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    content: faker.lorem.paragraph(),
    date: new Date(),
  },
});

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }

  return new ValidationStub();
};
const makeAddPost = (): IAddPost => {
  class AddPostStub implements IAddPost {
    async add(data: IAddPostModel): Promise<void> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new AddPostStub();
};

const makeSut = (): ISubTypes => {
  const validationStub = makeValidation();
  const addPostStub = makeAddPost();
  const sut = new AddPostController(validationStub, addPostStub);

  return {
    sut,
    validationStub,
    addPostStub,
  };
};

describe("AddPost Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Deve chamar o authentication com os valores corretos", async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  test("Deve retornar 400 se a validação falhar", async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, "validate").mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  test("Deve chamar o AddPost com os valores corretos", async () => {
    const { sut, addPostStub } = makeSut();
    const addSpy = jest.spyOn(addPostStub, "add");
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(addSpy).toBeCalledWith(httpRequest.body);
  });

  test("Deve retornar um erro 500 se o AddPosta lançar um erro", async () => {
    const { sut, addPostStub } = makeSut();
    const addSpy = jest
      .spyOn(addPostStub, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  test("Deve retornar 204 de tiver sucesso", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
