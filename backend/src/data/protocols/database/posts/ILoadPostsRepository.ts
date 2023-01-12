import { IPostModel } from "../../../../domain/models/IPostModel";

interface ILoadPostsRepository {
  loadAll(): Promise<IPostModel[]>;
}

export { ILoadPostsRepository };
