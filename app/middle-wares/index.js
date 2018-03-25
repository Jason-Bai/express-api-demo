const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config');
const logger = require('./logger');
const U = require('../lib/utils');

module.exports = (app) => {
  return () => {
    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
    logger(app)();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use((req, res, next) => {
      /**
       * 初始化hooks
       * 因为后续要通过 req.hooks 来传递一些共用的变量
       */
      req.hooks = {};
      next();
    });
    app.use(express.static(U.path.join(__dirname, '../public')));
  };
};
