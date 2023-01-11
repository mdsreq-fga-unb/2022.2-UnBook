import { faker } from "@faker-js/faker";
import { AddPostController } from "../../../src/presentation/controllers/post-controller.ts/AddPostController";
import { badRequest } from "../../../src/presentation/helpers/http/http-helper";
import { IHttpRequest } from "../../../src/presentation/protocols";
import { IValidation } from "../../../src/validation/protocols/IValidation";

interface ISubTypes {
  sut: AddPostController;
  validationStub: IValidation;
}

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    content: faker.lorem.paragraph(),
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

const makeSut = (): ISubTypes => {
  const validationStub = makeValidation();
  const sut = new AddPostController(validationStub);

  return {
    sut,
    validationStub,
  };
};

describe("AddPost Controller", () => {
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
});
