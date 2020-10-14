const { query } = require('express');
const Product = require('../models/product');


exports.getPostLists = (req,res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let query = {};
  if(req.query.minPrice && req.query.maxPrice){
    query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
  }
  if(req.query.name){
    query.name = req.query.name;
  }
  console.log('query', query);
  let productLists;
  const postQuery = Product.find(query).populate('category');
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery
    .then(documents => {
      productLists = documents;
      return Product.countDocuments();
    }).then(count => {
      res.status(200).json({
        message : 'Get successfully',
        products: productLists,
        total: count
      });
    });
};




