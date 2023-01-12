import { IAddPostModel } from "../../../../domain/usecases/IAddPostUseCase";

interface IAddPostRepository {
  add(postData: IAddPostModel): Promise<void>;
}

export { IAddPostRepository };
