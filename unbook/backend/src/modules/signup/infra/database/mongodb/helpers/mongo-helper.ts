/* eslint-disable @typescript-eslint/no-var-requires */
import mongoose from "mongoose";

const MongoHelper = {
  mongoClient: null as unknown as mongoose.Mongoose,

  async conect(): Promise<void> {
    this.mongoClient = await mongoose.connect(process.env.MONGO_URL as string);
  },

  async disconect(): Promise<void> {
    await this.mongoClient.connection.close();
  },
};

export { MongoHelper };
