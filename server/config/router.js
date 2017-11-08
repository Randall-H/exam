/**
 *
 *
 * @config  => Global SubRouter Middleware
 * @version => 1-0-0
 * @notes   => This router passes packages as middleware into the SubEnvironment
 **/

var express = require('express');
var router = express.Router();
var path = require('path');
var AuthController = require('../Zola/controllers/Auth');
var UserController = require('../Zola/controllers/User');


router.post('/login', AuthController.validate, AuthController.login);

router.get('/api/getUsers', AuthController.verify, UserController.getData);


module.exports = router;
