"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_route_adapter_1 = require("../adapters/express-route-adapter");
const login_controller_factory_1 = require("../factories/controllers/login/login-controller-factory");
const signup_controller_factory_1 = require("../factories/controllers/signup/signup-controller-factory");
exports.default = (router) => {
    router.post("/signup", (0, express_route_adapter_1.adaptRoute)((0, signup_controller_factory_1.makeSignUpController)()));
    router.post("/login", (0, express_route_adapter_1.adaptRoute)((0, login_controller_factory_1.makeLogInController)()));
};
