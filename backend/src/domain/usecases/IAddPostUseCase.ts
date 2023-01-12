interface IAddPostModel {
  content: string;
  date: Date;
}

interface IAddPost {
  add(data: IAddPostModel): Promise<void>;
}

export { IAddPostModel, IAddPost };
