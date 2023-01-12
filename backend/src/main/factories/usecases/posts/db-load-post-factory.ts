import { LoadPostsRepository } from "../../../../data/repositories/LoadPostsRepository";
import { ILoadPosts } from "../../../../domain/usecases/ILoadPostUseCase";
import { PostMongoRepository } from "../../../../infra/database/mongodb/repositories/posts/PostMongoRepository";

const makeDbLoadPosts = (): ILoadPosts => {
  const postMongoRepository = new PostMongoRepository();
  return new LoadPostsRepository(postMongoRepository);
};
export { makeDbLoadPosts };
