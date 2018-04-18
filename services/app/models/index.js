const Sequelize = require('sequelize');
const U = require('../lib/utils');
const config = require('../config');

/* eslint max-len: 0 */
const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options || {});

const models = {};

// 查找文件
const filterFile = (file) => {
  const basename = U.path.basename(__filename);
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
};

// 导入models
const forEachFile = (file) => {
  const model = sequelize.import(U.path.join(__dirname, file));
  models[model.name] = model;
};

U.fs.readdirSync(__dirname).filter(filterFile).forEach(forEachFile);

// 导出models
const forEachModel = (modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
};

Object.keys(models).forEach(forEachModel);

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
