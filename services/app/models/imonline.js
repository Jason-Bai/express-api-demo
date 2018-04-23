const U = require('../lib/utils');
const ModelBase = require('./base');

const Sequelize = U.rest.Sequelize;

module.exports = (sequelize) => {
  const ImOnline = U._.extend(sequelize.define('imonline', {
    id: {
      type: Sequelize.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.ENUM,
      allowNull: false,
      values: ['predicted', 'predicting'],
      defaultValue: 'predicted',
    },
    current: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '当前人数',
    },
    history: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '历史最高',
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    quarter: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '开奖季度',
    },
    month: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '开奖月份',
    },
    weekday: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '开奖周几',
    },
    hour: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '开奖小时',
    },
    minute: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: false,
      comment: '开奖分钟',
    },
    result: {
      type: Sequelize.type('string', 5),
      allowNull: false,
      comment: '开奖结果',
    },
  }, {
    comment: 'QQ在线人数表',
    freezeTableName: true,
    hooks: {},
    instanceMethods: {},
    classMethods: {},

  }), ModelBase, {
    sort: {
      default: 'createdAt',
      allow: ['id', 'status', 'date', 'updatedAt', 'createdAt'],
    },
    writableCols: [
      'status', 'current', 'history', 'date',
      'quarter', 'month', 'weekday', 'hour',
      'minute', 'result',
    ],
    editableCols: [],
    /** 只有管理员才可以修改的字段 */
    onlyAdminCols: ['status'],

    /** 定义允许包含返回的字段，不设置为全部 */
    allowIncludeCols: [
      'status', 'current', 'date', 'result',
    ],
  });

  return ImOnline;
};
