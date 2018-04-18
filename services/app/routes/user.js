const express = require('express');

const UserCtrl = require('../controllers/user');

const router = express.Router();

const [create, destroy] = ['create', 'destroy', 'createTask', 'destroyTask'].map(method => UserCtrl[method]);

router.post('/create', create);

router.get('/:user_id/destroy', destroy);

module.exports = router;
