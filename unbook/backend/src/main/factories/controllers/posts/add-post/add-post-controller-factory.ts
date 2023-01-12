import { AddPostController } from "../../../../../presentation/controllers/post/AddPostController";
import { IController } from "../../../../../presentation/protocols/signup-protocols";
import { makeLogControllerDecorator } from "../../../usecases/decorators/log-controller-decorator-factory";
import { makeDbAddPost } from "../../../usecases/posts/db-add-post-factory";
import { makeAddPostValidation } from "./add-post-validation-factory";

const makeAddPostController = (): IController => {
  const controller = new AddPostController(
    makeAddPostValidation(),
    makeDbAddPost()
  );
  return makeLogControllerDecorator(controller);
};
export { makeAddPostController };
