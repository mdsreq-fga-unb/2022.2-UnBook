import { IAddPost, IAddPostModel } from "../../domain/usecases/IAddPostUseCase";
import { IAddPostRepository } from "../protocols/database/posts/IAddPostRepository";

export class AddPostRepository implements IAddPost {
  constructor(private readonly addPostRepository: IAddPostRepository) {}
  async add(postData: IAddPostModel): Promise<void> {
    await this.addPostRepository.add(postData);
  }
}
