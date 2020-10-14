const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  //creator: {type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
  createdAt: {type: Date, default: new Date().toISOString()}
});

module.exports = mongoose.model('Review', reviewSchema);
