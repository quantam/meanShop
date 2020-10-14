const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  cart: {type: mongoose.Schema.Types.ObjectId, ref:"Cart", required: true},
  shippingAddress: {type:String, required:true},
  shippingPin: {type:String, required:true},
  user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Order', orderSchema);
