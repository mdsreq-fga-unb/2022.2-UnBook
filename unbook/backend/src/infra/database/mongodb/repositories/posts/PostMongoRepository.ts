/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddPostRepository } from "../../../../../data/protocols/database/posts/IAddPostRepository";
import { ILoadPostsRepository } from "../../../../../data/protocols/database/posts/ILoadPostsRepository";
import { IPostModel } from "../../../../../domain/models/IPostModel";
import { IAddPostModel } from "../../../../../domain/usecases/IAddPostUseCase";
import { MongoHelper } from "../../helpers/mongo-helper";

class PostMongoRepository implements IAddPostRepository, ILoadPostsRepository {
  async add(postData: IAddPostModel): Promise<void> {
    const postCollection = MongoHelper.getCollection("posts");
    await postCollection.insertOne(postData);
  }
  async loadAll(): Promise<IPostModel[]> {
    const postCollection = MongoHelper.getCollection("posts");
    const posts = await postCollection.find().toArray();
    return posts as unknown as IPostModel[];
  }
}

export { PostMongoRepository };
