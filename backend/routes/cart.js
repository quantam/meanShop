const express = require("express");
const checkAuth = require('../middleware/check-auth');
const cartController = require('../controllers/cart');

const router = express.Router();

router.post('', cartController.addToCart);
router.get('', cartController.getCartByUser);


module.exports = router;
