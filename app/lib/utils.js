const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const util = require('util');
const moment = require('moment');
const axios = require('axios');
const async = require('async');

const isDev = process.env.NODE_ENV === 'development';

const isTest = process.env.NODE_ENV === 'test';

const isProd = process.env.NODE_ENV === 'production';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const utils = {
  _,
  fs,
  path,
  util,
  moment,
  dateFormat,
  timeFormat,
  isDev,
  isTest,
  isProd,
  axios,
  async,
};

const U = Object.assign({}, utils);

module.exports = U;
