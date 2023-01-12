import { IPostModel } from "../models/IPostModel";

interface ILoadPosts {
  load(): Promise<IPostModel[]>;
}

export { ILoadPosts };
