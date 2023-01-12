"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogInController = void 0;
const LogInController_1 = require("../../../../presentation/controllers/login/LogInController");
const db_authentication_factory_1 = require("../../usecases/authentication/db-authentication-factory");
const log_controller_decorator_factory_1 = require("../../usecases/decorators/log-controller-decorator-factory");
const login_validation_factory_1 = require("./login-validation-factory");
const makeLogInController = () => {
    return (0, log_controller_decorator_factory_1.makeLogControllerDecorator)(new LogInController_1.LoginController((0, db_authentication_factory_1.makeDbAuthentication)(), (0, login_validation_factory_1.makeLogInValidation)()));
};
exports.makeLogInController = makeLogInController;
