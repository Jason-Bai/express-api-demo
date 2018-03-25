const models  = require('../models');

const index = function index(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    const json = {
      title: 'Sequelize: Express Example',
      users: users,
    };
    res.status(200).json(json)
  });
};

module.exports = {
  index,
};
