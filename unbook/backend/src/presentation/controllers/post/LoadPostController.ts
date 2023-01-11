/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoadPosts } from "../../../domain/usecases/ILoadPostUseCase";
import { ok, serverError } from "../../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";

class LoadPostsController implements IController {
  constructor(private readonly loadPosts: ILoadPosts) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const posts = await this.loadPosts.load();
      return ok(posts);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export { LoadPostsController };
