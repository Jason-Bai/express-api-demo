const fs = require('fs');
const logger = require('morgan');
const U = require('../lib/utils');

const getLogger = () => {
  const env = U.getEnv();
  const isDev = env === 'development';
  const isTest = env === 'test';
  const isProd = env === 'production';

  const morgan = {
    format: 'dev',
    options: {
      stream: process.stdout,
    },
  };

  const today = U.moment().format(U.dateFormat);

  if (isDev) {
    const devOut = fs.createWriteStream(U.path.join(__dirname, `../logs/access_${today}.log`), {flags: 'a'});
    morgan.options.stream = devOut;
  }

  if (isProd) {
    const prodOut = fs.createWriteStream(U.path.join(__dirname, `../logs/access_${today}.log`), {flags: 'a'});
    morgan.format = 'combined';
    morgan.options.stream = prodOut;
  }

  if (isTest) {
    morgan.format = ':method :url :status :res[content-length] - :response-time ms';
  }

  return morgan;
};

module.exports = (app) => {
  const loggerOpt = getLogger();
  return () => {
    app.use(logger(loggerOpt.format, loggerOpt.options));
  };
};
