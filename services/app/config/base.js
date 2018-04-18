module.exports = {
  service: {
    name: 'express-api-demo',
    version: '0.0.1',
    ip: '127.0.0.1',
    port: 3001,
  },
  db: {
    user: 'root',
    pass: 'root',
    name: 'test',
    options: {
      host: '127.0.0.1',
      port: 3306,
      dialect: 'mysql',
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false,
    },
  },
};
