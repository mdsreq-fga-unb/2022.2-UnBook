/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoadPosts } from "../../../domain/usecases/ILoadPostUseCase";
import { ok } from "../../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";

class LoadPostsController implements IController {
  constructor(private readonly loadPosts: ILoadPosts) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const posts = await this.loadPosts.load();
    return ok(posts);
  }
}

export { LoadPostsController };
