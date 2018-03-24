'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: DataTypes.STRING
  }, {
    comment: '用户表',
    freezeTableName: true,
  });

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};
