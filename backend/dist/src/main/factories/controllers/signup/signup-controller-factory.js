"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSignUpController = void 0;
const SingUpController_1 = require("../../../../presentation/controllers/signup/SingUpController");
const db_add_account_factory_1 = require("../../usecases/add-account/db-add-account-factory");
const db_authentication_factory_1 = require("../../usecases/authentication/db-authentication-factory");
const log_controller_decorator_factory_1 = require("../../usecases/decorators/log-controller-decorator-factory");
const signup_validation_factory_1 = require("./signup-validation-factory");
const makeSignUpController = () => {
    return (0, log_controller_decorator_factory_1.makeLogControllerDecorator)(new SingUpController_1.SignUpController((0, db_add_account_factory_1.makeDbAddAccount)(), (0, signup_validation_factory_1.makeSignUpValidation)(), (0, db_authentication_factory_1.makeDbAuthentication)()));
};
exports.makeSignUpController = makeSignUpController;
