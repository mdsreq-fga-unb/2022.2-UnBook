interface IAddPostModel {
  content: string;
}

interface IAddPost {
  add(data: IAddPostModel): Promise<void>;
}

export { IAddPostModel, IAddPost };
