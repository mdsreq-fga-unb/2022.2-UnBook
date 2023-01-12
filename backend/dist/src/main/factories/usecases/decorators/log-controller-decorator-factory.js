"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeLogControllerDecorator = void 0;
const LogMongoRepository_1 = require("../../../../infra/database/mongodb/repositories/log/LogMongoRepository");
const LogControllerDecorator_1 = require("../../../decorators/LogControllerDecorator");
const makeLogControllerDecorator = (controller) => {
    const logMongoRepository = new LogMongoRepository_1.LogMongoRepository();
    return new LogControllerDecorator_1.LogControllerDecorator(controller, logMongoRepository);
};
exports.makeLogControllerDecorator = makeLogControllerDecorator;
