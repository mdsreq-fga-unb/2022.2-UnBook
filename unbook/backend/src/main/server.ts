import { MongoHelper } from "../infra/database/mongodb/helpers/mongo-helper";
import { app } from "./config/app";
import env from "./config/env";

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(3000, () =>
      console.log(`Server is Running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
