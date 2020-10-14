const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  products: [{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true}],
  user: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  createdAt: {type: Date, default: new Date().toISOString()},
  updatedAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
