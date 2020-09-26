const express = require("express");
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const multer = require('multer');
const postController = require('../controllers/post');

const router = express.Router();

router.post('', checkAuth, extractFile, postController.createPost);

router.get('', postController.getPostList);

router.delete('/:id', checkAuth, postController.deletePost);

router.get('/:id', postController.getSinglePost);

router.put('/:id', checkAuth, extractFile, postController.updatePost);


module.exports = router;
