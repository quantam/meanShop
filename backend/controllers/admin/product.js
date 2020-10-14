const Post = require('../../models/post');
const Product = require('../../models/product');

exports.createProduct = (req, res) => {
  const url = req.protocol + '://'+req.get('host');
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: {
      originalPrice: req.body.originalPrice,
      offerPrice: req.body.offerPrice
    },
    quantity:{
      inStock: req.body.inStock,
      totalStock: req.body.totalStock
    },
    description: req.body.description,
    tags: req.body.tags,
    imagePath: url + '/backend/images/'+ req.file.filename,
  });
  product.save().then(result => {
     res.status(200).json({
        message: 'Added successfuly',
        product : result
    });
  }).catch(ex => {
    res.status(500).json({
      message : ex
  });
  });
};

exports.getProductList = (req,res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedProducts;
  const postQuery = Product.find().populate('category');
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedProducts = documents;
      return Product.countDocuments();
    }).then(count => {
      res.status(200).json({
        message : 'Success',
        products: fetchedProducts,
        total: count
      });
    });
};

exports.deleteProduct = (req, res) => {
  Product.deleteOne({_id: req.params.id}).then(response => {
    if(response.n > 0){
      res.status(200).json({
        message: 'Deleted Successfully',
        response: response
      });
    }else {
      res.status(401).json({
        message: 'Delete, not Authorized'
      });
    }
  });
};

exports.getSingleProduct = (req,res) => {
  Product.findById(req.params.id).populate('category').then(response =>{
    res.status(200).json({
      message: 'get Successfully',
      product: response
    });
  });
};

exports.updatePost = (req,res) => {
  let imagePath = req.body.image;
  if(req.file){
    const url = req.protocol + '://'+req.get('host');
    imagePath = url + '/images/'+ req.file.filename;
  }
  const post= new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
  });
  Post.updateOne({_id:req.params.id, creator: req.userData.userId}, post).then(response =>{
    if(response.n > 0){
      res.status(200).json({
        message: 'Updated Successfully',
        post: response
      });
    }else{
      res.status(401).json({
        message: 'Updated Failed, Not authorized'
      });
    }
  });
};


