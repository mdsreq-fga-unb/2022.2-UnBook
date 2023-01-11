import { faker } from "@faker-js/faker";
import { AddPostController } from "../../../src/presentation/controllers/post-controller.ts/AddPostController";
import { IHttpRequest } from "../../../src/presentation/protocols";
import { IValidation } from "../../../src/validation/protocols/IValidation";

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    content: faker.lorem.paragraph(),
  },
});

describe("AddPost Controller", () => {
  test("Dev chamar o authentication com os valores corretos", async () => {
    class ValidationStub implements IValidation {
      validate(input: any): Error {
        return null;
      }
    }
    const validationStub = new ValidationStub();
    const validateSpy = jest.spyOn(validationStub, "validate");
    const sut = new AddPostController(validationStub);
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
