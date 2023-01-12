"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_middleware_adapter_1 = require("../adapters/express-middleware-adapter");
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const add_post_controller_factory_1 = require("../factories/controllers/posts/add-post/add-post-controller-factory");
const load_posts_controller_factory_1 = require("../factories/controllers/posts/load-post/load-posts-controller-factory");
const auth_middleware_factory_1 = require("../factories/middlewares/auth-middleware-factory");
exports.default = (router) => {
    const userAuth = (0, express_middleware_adapter_1.adaptMiddleware)((0, auth_middleware_factory_1.makeAuthMiddleware)());
    router.post("/posts", userAuth, (0, express_route_adapter_1.adaptRoute)((0, add_post_controller_factory_1.makeAddPostController)()));
    router.get("/posts", userAuth, (0, express_route_adapter_1.adaptRoute)((0, load_posts_controller_factory_1.makeLoadPostsController)()));
};
