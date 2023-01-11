import { ILogErrorRepository } from "../../../../../data/protocols/database/log/ILogErrorRepository";
import { MongoHelper } from "../../helpers/mongo-helper";

class LogMongoRepository implements ILogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection("errors");
    await errorCollection.insertOne({
      stack,
      date: new Date(),
    });
  }
}

export { LogMongoRepository };
