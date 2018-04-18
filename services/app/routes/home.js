const express = require('express');

const HomeCtrl = require('../controllers/home');

const router = express.Router();

const [index] = ['index'].map(method => HomeCtrl[method]);

router.get('/', index);

module.exports = router;
