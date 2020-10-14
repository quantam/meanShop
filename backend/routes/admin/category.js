const express = require("express");
const checkAuth = require('../../middleware/check-auth');
const categoryController = require('../../controllers/admin/category');

const router = express.Router();

router.get('', categoryController.getCategoryList);


module.exports = router;
