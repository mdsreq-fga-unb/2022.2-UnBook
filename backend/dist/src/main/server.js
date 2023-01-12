"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_helper_1 = require("../infra/database/mongodb/helpers/mongo-helper");
const app_1 = require("./config/app");
const env_1 = __importDefault(require("./config/env"));
mongo_helper_1.MongoHelper.connect(env_1.default.mongoUrl)
    .then(() => {
    app_1.app.listen(3000, () => console.log(`Server is Running at http://localhost:${env_1.default.port}`));
})
    .catch(console.error);
