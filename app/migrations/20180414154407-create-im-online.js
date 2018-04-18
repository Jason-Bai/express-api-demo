const tableName = 'imonline';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const createTable = queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      current: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '当前人数',
      },
      history: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '历史最高',
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        comment: '当前日期',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    return createTable;
  },
  down: (queryInterface) => {
    const dropTable = queryInterface.dropTable(tableName);
    return dropTable;
  },
};
