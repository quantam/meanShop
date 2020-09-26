const express = require("express");
const User = require('../models/user');
const userController = require("../controllers/user");
const router = express.Router();

router.post('/signup', userController.createUser);

router.post('/login', userController.login);

module.exports = router;
