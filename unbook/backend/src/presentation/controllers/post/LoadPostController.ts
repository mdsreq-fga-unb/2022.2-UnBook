/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoadPosts } from "../../../domain/usecases/ILoadPostUseCase";
import { IController, IHttpRequest, IHttpResponse } from "../../protocols";

class LoadPostsController implements IController {
  constructor(private readonly loadPosts: ILoadPosts) {}
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadPosts.load();
    return null;
  }
}

export { LoadPostsController };
