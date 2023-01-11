import { IAddPost } from "../../../domain/usecases/IAddPostUseCase";
import { badRequest } from "../../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";
import { IValidation } from "../../protocols/signup-protocols";

class AddPostController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addPost: IAddPost
  ) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    const { content } = httpRequest.body;
    await this.addPost.add({ content });
    return null;
  }
}

export { AddPostController };
