const express = require('express');

const { ImOnline } = require('../models');

const ImOnlineCtrl = require('../controllers/imonline');

const router = express.Router();

const [list] = ['list'].map(method => ImOnlineCtrl[method]);

router.post('/imonlines', list(ImOnline));

module.exports = router;
