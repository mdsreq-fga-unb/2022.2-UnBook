import { ILoadPostsRepository } from "../../../../src/data/protocols/database/posts/ILoadPostsRepository";
import { LoadPostsRepository } from "../../../../src/data/repositories/LoadPostsRepository";
import { IPostModel } from "../../../../src/domain/models/IPostModel";

const makeFakePosts = (): IPostModel[] => {
  return [
    {
      id: "any_id",
      content: "any_content",
      date: new Date(),
    },
    {
      id: "other_id",
      content: "other_content",
      date: new Date(),
    },
  ];
};

describe("LoadPost Controller", () => {
  test("Deve chamar o LoadPostsRepository", async () => {
    class LoadPostsRepositoryStub implements ILoadPostsRepository {
      async loadAll(): Promise<IPostModel[]> {
        return new Promise((resolve) => resolve(makeFakePosts()));
      }
    }
    const loadPostsRepositoryStub = new LoadPostsRepositoryStub();
    const loadAllSpy = jest.spyOn(loadPostsRepositoryStub, "loadAll");
    const sut = new LoadPostsRepository(loadPostsRepositoryStub);
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
