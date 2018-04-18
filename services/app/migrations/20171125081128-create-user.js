const tableName = 'user';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const createTable = queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    return createTable;
  },
  down: (queryInterface) => {
    const dropTable = queryInterface.dropTable(tableName);
    return dropTable;
  },
};
