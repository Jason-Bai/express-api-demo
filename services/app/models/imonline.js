module.exports = (sequelize, DataTypes) => {
  const ImOnline = sequelize.define('ImOnline', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM('predicted', 'predicting'),
      defaultValue: 'predicted',
    },
    predictably: {
      type: DataTypes.TEXT,
      set: (val) => {
        this.setDataValue('predictably', JSON.stringify(val || []));
      },
      get: () => {
        let val = this.getDataValue('predictably');
        try {
          val = JSON.parse(val);
        } catch (e) { /* ignore */ }
        return val || [];
      },
    },
    number: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: '开奖期数',
    },
    current: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '当前人数',
    },
    history: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '历史最高',
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '当前日期',
    },
    quarter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '季度',
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '月份',
    },
    weekday: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '星期几',
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '小时',
    },
    minute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '分钟',
    },
    result: {
      type: DataTypes.STRING(5),
      allowNull: false,
      comment: '人数结果',
    },
    isDelete: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no',
    },
  }, {
    comment: 'QQ在线人数',
    freezeTableName: true,
    tableName: 'imonline',
    classMethods: {
      async list() {
        return [];
      },
      attributes: ['id', 'type', 'predictably', 'number', 'current', 'date', 'result', 'createdAt'],
    },
  });
  return ImOnline;
};
