const homeRouter = require('./home');
const userRouter = require('./user');

module.exports = (app) => {
  const routes = () => {
    // 首页
    app.use('/', homeRouter);
    // 用户
    app.use('/users', userRouter);
  };
  return routes;
};
