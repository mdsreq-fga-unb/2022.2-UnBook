import MockDate from "mockdate";
import { IPostModel } from "../../../src/domain/models/IPostModel";
import { ILoadPosts } from "../../../src/domain/usecases/ILoadPostUseCase";
import { LoadPostsController } from "../../../src/presentation/controllers/post/LoadPostController";

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

interface ISubTypes {
  sut: LoadPostsController;
  loadPostsStub: ILoadPosts;
}

const makeSut = (): ISubTypes => {
  class LoadPostsStub implements ILoadPosts {
    async load(): Promise<IPostModel[]> {
      return new Promise((resolve) => resolve(makeFakePosts()));
    }
  }
  const loadPostsStub = new LoadPostsStub();
  const sut = new LoadPostsController(loadPostsStub);

  return {
    sut,
    loadPostsStub,
  };
};

describe("LoadPost Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  test("Deve chamar o LoadPosts", () => {
    const { sut, loadPostsStub } = makeSut();
    const loadSpy = jest.spyOn(loadPostsStub, "load");
    sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
