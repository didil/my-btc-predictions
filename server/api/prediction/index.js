'use strict';

var express = require('express');
var controller = require('./prediction.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/multisave', auth.isAuthenticated(), controller.multisave);

module.exports = router;