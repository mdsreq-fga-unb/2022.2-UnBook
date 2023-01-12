"use strict";

var _path = require("path");
var _fs = require("fs");
const debug = require('debug')('jest-mongodb:teardown');
module.exports = async function (config) {
  const globalConfigPath = (0, _path.join)(config.rootDir, 'globalConfig.json');
  debug('Teardown mongod');
  if (global.__MONGOD__) {
    await global.__MONGOD__.stop();
  }
  (0, _fs.unlink)(globalConfigPath, err => {
    if (err) {
      debug('Config could not be deleted');
      return;
    }
    debug('Config is deleted');
  });
};