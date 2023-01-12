"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDbLoadPosts = void 0;
const LoadPostsRepository_1 = require("../../../../data/repositories/LoadPostsRepository");
const PostMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/posts/PostMongoRepository");
const makeDbLoadPosts = () => {
    const postMongoRepository = new PostMongoRepository_1.PostMongoRepository();
    return new LoadPostsRepository_1.LoadPostsRepository(postMongoRepository);
};
exports.makeDbLoadPosts = makeDbLoadPosts;
