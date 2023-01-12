"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLoadPostsController = void 0;
const LoadPostsController_1 = require("../../../../../presentation/controllers/post/LoadPostsController");
const log_controller_decorator_factory_1 = require("../../../usecases/decorators/log-controller-decorator-factory");
const db_load_post_factory_1 = require("../../../usecases/posts/db-load-post-factory");
const makeLoadPostsController = () => {
    const controller = new LoadPostsController_1.LoadPostsController((0, db_load_post_factory_1.makeDbLoadPosts)());
    return (0, log_controller_decorator_factory_1.makeLogControllerDecorator)(controller);
};
exports.makeLoadPostsController = makeLoadPostsController;
