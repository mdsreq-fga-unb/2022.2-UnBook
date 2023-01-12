import { LoadPostsController } from "../../../../../presentation/controllers/post/LoadPostsController";
import { IController } from "../../../../../presentation/protocols/signup-protocols";
import { makeLogControllerDecorator } from "../../../usecases/decorators/log-controller-decorator-factory";
import { makeDbLoadPosts } from "../../../usecases/posts/db-load-post-factory";

const makeLoadPostsController = (): IController => {
  const controller = new LoadPostsController(makeDbLoadPosts());
  return makeLogControllerDecorator(controller);
};
export { makeLoadPostsController };
