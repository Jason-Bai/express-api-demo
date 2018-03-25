const models  = require('../models');

const create = function(req, res) {
  models.User.create({
    username: req.body.username
  }).then(function() {
    res.redirect('/');
  });
};

const destroy = function(req, res) {
  models.User.destroy({
    where: {
      id: req.params.user_id
    }
  }).then(function() {
    res.redirect('/');
  });
};


const createTask = function (req, res) {
  models.Task.create({
    title: req.body.title,
    UserId: req.params.user_id
  }).then(function() {
    res.redirect('/');
  });
};

const destroyTask = function (req, res) {
  models.Task.destroy({
    where: {
      id: req.params.task_id
    }
  }).then(function() {
    res.redirect('/');
  });
};

module.exports = {
  create,
  destroy,
  createTask,
  destroyTask,
};
