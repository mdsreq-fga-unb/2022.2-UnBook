"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddPostController = void 0;
const AddPostController_1 = require("../../../../../presentation/controllers/post/AddPostController");
const log_controller_decorator_factory_1 = require("../../../usecases/decorators/log-controller-decorator-factory");
const db_add_post_factory_1 = require("../../../usecases/posts/db-add-post-factory");
const add_post_validation_factory_1 = require("./add-post-validation-factory");
const makeAddPostController = () => {
    const controller = new AddPostController_1.AddPostController((0, add_post_validation_factory_1.makeAddPostValidation)(), (0, db_add_post_factory_1.makeDbAddPost)());
    return (0, log_controller_decorator_factory_1.makeLogControllerDecorator)(controller);
};
exports.makeAddPostController = makeAddPostController;
