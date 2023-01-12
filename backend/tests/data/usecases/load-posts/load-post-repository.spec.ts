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

interface ISutTypes {
  sut: LoadPostsRepository;
  loadPostsRepositoryStub: ILoadPostsRepository;
}

const makeSut = (): ISutTypes => {
  class LoadPostsRepositoryStub implements ILoadPostsRepository {
    async loadAll(): Promise<IPostModel[]> {
      return new Promise((resolve) => resolve(makeFakePosts()));
    }
  }
  const loadPostsRepositoryStub = new LoadPostsRepositoryStub();
  const sut = new LoadPostsRepository(loadPostsRepositoryStub);
  return {
    sut,
    loadPostsRepositoryStub,
  };
};

describe("LoadPost Controller", () => {
  test("Deve chamar o LoadPostsRepository", async () => {
    const { sut, loadPostsRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadPostsRepositoryStub, "loadAll");
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  test("Deve retornar uma lista de posts com sucesso", async () => {
    const { sut } = makeSut();
    const posts = await sut.load();
    expect(posts).toEqual(makeFakePosts());
  });

  test("Deve lançar um erro se o LoadPostRepository lançar um erro", async () => {
    const { sut, loadPostsRepositoryStub } = makeSut();
    jest
      .spyOn(loadPostsRepositoryStub, "loadAll")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
