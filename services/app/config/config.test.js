const config = require('./base.js');

// db configurations
config.db.host = '127.0.0.1';
config.db.port = 3306;
config.db.name = 'express_demo_test';
config.db.user = 'root';
config.db.pass = 'rootrootroot';
config.dialect = "mysql",

module.exports = config;
