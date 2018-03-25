const _         = require('lodash');
const fs        = require('fs');
const path      = require('path');
const moment    = require('moment');

// 获取NODE_ENV
const getEnv = () => {
  const env = process.env.NODE_ENV || 'development';
  return env;
};

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const utils = {
  _,
  fs,
  path,
  moment,
  getEnv,
  dateFormat,
  timeFormat,
};

const U = Object.assign({}, utils);

module.exports = U;
