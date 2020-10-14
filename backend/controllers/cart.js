const { response } = require('express');
const Cart =  require('../models/cart');
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;


exports.addToCart = (req, res) => {
  const cart = new Cart({
    products: req.body.productId,
    user: req.body.userId
  });

  if(req.body.id){
    cart.products.push(req.body.productId);
    cart.updatedAt = new Date().toISOString();
  }

  cart.save().then(result => {
      res.status(201).json({
         message: 'Added successfuly'
     });
   }).catch(ex => {
     console.log(ex);
   });
};

exports.getCartByUser = (req, res) => {
  Cart.find({user:new ObjectId(req.query.userId)}).then(response => {
    res.status(200).json({
      products : response
    })
  });
};
