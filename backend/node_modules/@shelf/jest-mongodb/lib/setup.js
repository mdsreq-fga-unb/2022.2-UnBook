"use strict";

var _fs = require("fs");
var _path = require("path");
var _mongodbMemoryServer = require("mongodb-memory-server");
var _helpers = require("./helpers");
/* eslint-disable multiline-ternary */

const debug = require('debug')('jest-mongodb:setup');
const mongoMemoryServerOptions = (0, _helpers.getMongodbMemoryOptions)();
const isReplSet = Boolean(mongoMemoryServerOptions.replSet);
debug(`isReplSet ${isReplSet}`);

// @ts-ignore
const mongo = isReplSet ? new _mongodbMemoryServer.MongoMemoryReplSet(mongoMemoryServerOptions) : new _mongodbMemoryServer.MongoMemoryServer(mongoMemoryServerOptions);
module.exports = async config => {
  const globalConfigPath = (0, _path.join)(config.rootDir, 'globalConfig.json');
  const options = (0, _helpers.getMongodbMemoryOptions)();
  const mongoConfig = {};
  debug(`shouldUseSharedDBForAllJestWorkers: ${(0, _helpers.shouldUseSharedDBForAllJestWorkers)()}`);

  // if we run one mongodb instance for all tests
  if ((0, _helpers.shouldUseSharedDBForAllJestWorkers)()) {
    if (!mongo.isRunning) {
      await mongo.start();
    }
    const mongoURLEnvName = (0, _helpers.getMongoURLEnvName)();
    mongoConfig.mongoUri = await mongo.getUri();
    process.env[mongoURLEnvName] = mongoConfig.mongoUri;

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongo;
  }
  mongoConfig.mongoDBName = options.instance.dbName;

  // Write global config to disk because all tests run in different contexts.
  (0, _fs.writeFileSync)(globalConfigPath, JSON.stringify(mongoConfig));
  debug('Config is written');
};