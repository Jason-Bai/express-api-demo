const express = require('express');
const U = require('./lib/utils');
const globalMiddlewares = require('./middle-wares');
const globalRouters = require('./routes');

const app = express();

// 配置全局中间件
globalMiddlewares(app)();

// 配置全局路由
globalRouters(app)();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
