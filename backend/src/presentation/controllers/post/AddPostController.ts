import { IAddPost } from "../../../domain/usecases/IAddPostUseCase";
import {
  badRequest,
  noContent,
  serverError,
} from "../../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IValidation } from "../../protocols/signup-protocols";

class AddPostController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addPost: IAddPost
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const test = this.validation.validate(httpRequest.body);
      if (test) {
        return badRequest(test);
      }
      const { content } = httpRequest.body;
      await this.addPost.add({ content, date: new Date() });
      return noContent();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export { AddPostController };
