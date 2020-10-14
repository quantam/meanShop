const express = require("express");
// const Product = require('../models/product');
const checkAuth = require('../../middleware/check-auth');
const extractFile = require('../../middleware/file');
const multer = require('multer');
const productController = require('../../controllers/admin/product');

const router = express.Router();

router.post('', extractFile, productController.createProduct);

router.get('', productController.getProductList);

// router.delete('/:id', checkAuth, postController.deletePost);

// router.get('/:id', postController.getSinglePost);

// router.put('/:id', checkAuth, extractFile, postController.updatePost);


module.exports = router;
