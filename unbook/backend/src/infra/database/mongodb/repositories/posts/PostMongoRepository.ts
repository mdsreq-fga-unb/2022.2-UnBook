/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAddPostRepository } from "../../../../../data/protocols/database/posts/IAddPostRepository";
import { IAddPostModel } from "../../../../../domain/usecases/IAddPostUseCase";
import { MongoHelper } from "../../helpers/mongo-helper";

class PostMongoRepository implements IAddPostRepository {
  async add(postData: IAddPostModel): Promise<void> {
    const postCollection = MongoHelper.getCollection("posts");
    await postCollection.insertOne(postData);
  }
}

export { PostMongoRepository };
