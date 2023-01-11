import { IPostModel } from "../../domain/models/IPostModel";
import { ILoadPosts } from "../../domain/usecases/ILoadPostUseCase";
import { ILoadPostsRepository } from "../protocols/database/posts/ILoadPostsRepository";

class LoadPostsRepository implements ILoadPosts {
  constructor(private readonly loadPostsRepository: ILoadPostsRepository) {}
  async load(): Promise<IPostModel[]> {
    const posts = await this.loadPostsRepository.loadAll();
    return posts;
  }
}

export { LoadPostsRepository };
