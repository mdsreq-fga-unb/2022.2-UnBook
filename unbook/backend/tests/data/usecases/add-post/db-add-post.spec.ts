/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddPostRepository } from "../../../../src/data/protocols/database/posts/IAddPostRepository";
import { AddPostRepository } from "../../../../src/data/repositories/AddPostRepository";
import { IAddPostModel } from "../../../../src/domain/usecases/IAddPostUseCase";

const makeFakePostData = (): IAddPostModel => ({
  content: "valid_content",
});

describe("AddPost Repository UseCase", () => {
  test("Deve chamar o AddPostRepository com os valores corretos", async () => {
    class AddPostRepositoryStub implements IAddPostRepository {
      async add(postData: IAddPostModel): Promise<void> {
        return new Promise((resolve) => resolve());
      }
    }
    const addPostRepositoryStub = new AddPostRepositoryStub();
    const addSpy = jest.spyOn(addPostRepositoryStub, "add");
    const sut = new AddPostRepository(addPostRepositoryStub);
    const postData = makeFakePostData();
    await sut.add(postData);
    expect(addSpy).toHaveBeenCalledWith(postData);
  });
});
