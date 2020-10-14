const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {type: String, required: true, unique:true},
  category: {type: mongoose.Schema.Types.ObjectId, ref:"Category", required: true},
  imagePath: {type:String},
  price: {originalPrice:{type:String, require:true}, offerPrice:{type:String}},
  description: {type:String, required: true},
  quantity: {inStock: {type:Number}, totalStock:{type:Number, required: true}},
  tags: [String],
  rating:{type: Number},
  reviews:{type: mongoose.Schema.Types.ObjectId, ref:"Reviews"},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Product', productSchema);
