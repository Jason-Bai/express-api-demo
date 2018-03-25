const models  = require('../models');

const create = function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function(user) {
    res.status(201).json(user);
  });
};

const destroy = function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.status(204).send('');
  });
};

const createTask = function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function(task) {
    res.status(200).json(task);
  });
};

const destroyTask = function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.status(204).send('');
  });
};

module.exports = {
  create,
  destroy,
  createTask,
  destroyTask,
};
