const env       = process.env.NODE_ENV || 'development';

const config    = require(`${__dirname}/../config/config.${env}.js`);

module.exports = config;
