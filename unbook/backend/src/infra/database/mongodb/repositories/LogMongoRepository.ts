import { ILogErrorRepository } from "../../../../database/protocols/database/ILogErrorRepository";
import { MongoHelper } from "../helpers/mongo-helper";

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
