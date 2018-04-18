module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      },
      comment: '用户名',
    },
    isDelete: {
      type: DataTypes.ENUM,
      values: ['yes', 'no'],
      defaultValue: 'no',
    },
  }, {
    comment: '用户表',
    freezeTableName: true,
    tableName: 'user',
  });

  return User;
};
