const express = require('express');
const globalMiddlewares = require('./middle-wares');
const globalRouters = require('./routes');

const app = express();

app.settings.view = null;

// 配置全局中间件
globalMiddlewares(app)();

// 配置全局路由
globalRouters(app)();

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {},
  });
});


module.exports = app;
