const _         = require('lodash');
const fs        = require('fs');
const path      = require('path');
const moment    = require('moment');

const isDev = process.env.NODE_ENV === 'development';

const isTest = process.env.NODE_ENV === 'test';

const isProd = process.env.NODE_ENV === 'production';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const utils = {
  _,
  fs,
  path,
  moment,
  dateFormat,
  timeFormat,
  isDev,
  isTest,
  isProd,
};

const U = Object.assign({}, utils);

module.exports = U;
