const config = require('./base.js');

// db configurations
config.db.host = '127.0.0.1';
config.db.port = 3306;
config.db.name = 'imonline_dev';
config.db.user = 'root';
config.db.pass = '12345678';
config.dialect = 'mysql';

module.exports = config;