"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupMiddlewares = void 0;
const index_1 = require("../middlewares/index");
const setupMiddlewares = (app) => {
    app.use(index_1.bodyParser);
    app.use(index_1.cors);
    app.use(index_1.contentType);
};
exports.setupMiddlewares = setupMiddlewares;
