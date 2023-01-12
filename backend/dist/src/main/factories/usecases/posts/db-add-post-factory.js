"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbAddPost = void 0;
const AddPostRepository_1 = require("../../../../data/repositories/AddPostRepository");
const PostMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/posts/PostMongoRepository");
const makeDbAddPost = () => {
    const postMongoRepository = new PostMongoRepository_1.PostMongoRepository();
    return new AddPostRepository_1.AddPostRepository(postMongoRepository);
};
exports.makeDbAddPost = makeDbAddPost;
