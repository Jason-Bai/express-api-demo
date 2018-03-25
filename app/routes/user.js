const express = require('express');
const UserCtrl = require('../controllers/user');
const router  = express.Router();

const [create, destroy, createTask, destroyTask] = ['create', 'destroy', 'createTask', 'destroyTask'].map((method) => UserCtrl[method]);

router.post('/create', create);

router.get('/:user_id/destroy', destroy);

router.post('/:user_id/tasks/create', createTask);

router.get('/:user_id/tasks/:task_id/destroy', destroyTask);

module.exports = router;
