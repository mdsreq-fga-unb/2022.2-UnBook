/* eslint-disable @typescript-eslint/no-unused-vars */
import MockDate from "mockdate";
import { IAddPostRepository } from "../../../../src/data/protocols/database/posts/IAddPostRepository";
import { AddPostRepository } from "../../../../src/data/repositories/AddPostRepository";
import { IAddPostModel } from "../../../../src/domain/usecases/IAddPostUseCase";

interface ISutTypes {
  sut: AddPostRepository;
  addPostRepositoryStub: IAddPostRepository;
}

const makeFakePostData = (): IAddPostModel => ({
  content: "valid_content",
  date: new Date(),
});

const makeAddPostRepository = (): IAddPostRepository => {
  class AddPostRepositoryStub implements IAddPostRepository {
    async add(postData: IAddPostModel): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new AddPostRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const addPostRepositoryStub = makeAddPostRepository();
  const sut = new AddPostRepository(addPostRepositoryStub);
  return {
    sut,
    addPostRepositoryStub,
  };
};

describe("AddPost Repository UseCase", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Deve chamar o AddPostRepository com os valores corretos", async () => {
    const { sut, addPostRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addPostRepositoryStub, "add");
    const postData = makeFakePostData();
    await sut.add(postData);
    expect(addSpy).toHaveBeenCalledWith(postData);
  });

  test("Deve lançar um erro de o AddPostRepository falhar", async () => {
    const { sut, addPostRepositoryStub } = makeSut();
    jest.spyOn(addPostRepositoryStub, "add").mockRejectedValueOnce(new Error());
    const promise = sut.add(makeFakePostData());
    await expect(promise).rejects.toThrow();
  });
});
