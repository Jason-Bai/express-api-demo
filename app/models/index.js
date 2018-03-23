'use strict';

const Sequelize = require('sequelize');
const U = require('../lib/utils');
const config = require('../config');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, config.db.options || {});

const models = {};

U.fs
  .readdirSync(__dirname)
  .filter(file => {
    const basename  = U.path.basename(__filename);
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](U.path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
