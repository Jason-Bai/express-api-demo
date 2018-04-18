const models = require('../models');

const create = (req, res) => {
  models.User.create({
    username: req.body.username,
  }).then((user) => {
    res.status(201).json(user);
  });
};

const destroy = (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.userId,
    },
  }).then(() => {
    res.status(204).send('');
  });
};

module.exports = {
  create,
  destroy,
};
