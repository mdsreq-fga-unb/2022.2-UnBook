import { IPostModel } from "../models/PostModel";

interface IAddPostModel {
  content: string;
}

interface IAddPost {
  add(data: IAddPostModel): Promise<IPostModel>;
}

export { IAddPostModel, IAddPost };
