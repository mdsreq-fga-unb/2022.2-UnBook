import { AddPostRepository } from "../../../../data/repositories/AddPostRepository";
import { IAddPost } from "../../../../domain/usecases/IAddPostUseCase";
import { PostMongoRepository } from "../../../../infra/database/mongodb/repositories/posts/PostMongoRepository";

const makeDbAddPost = (): IAddPost => {
  const postMongoRepository = new PostMongoRepository();
  return new AddPostRepository(postMongoRepository);
};
export { makeDbAddPost };
