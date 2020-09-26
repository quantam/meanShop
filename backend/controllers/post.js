const Post = require('../models/post');

exports.createPost = (req, res) => {
  const url = req.protocol + '://'+req.get('host');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/'+ req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
     res.status(201).json({
        message: 'Added successfuly',
        post : result
    });
  }).catch(ex => {
    console.log(ex);
  });
};

exports.getPostList = (req,res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedPosts;
  const postQuery = Post.find();
  if(pageSize && currentPage){
    postQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    }).then(count => {
      res.status(200).json({
        message : 'Get post successfully',
        posts: fetchedPosts,
        totalPosts: count
      });
    });
};

exports.deletePost = (req, res) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(response => {
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

exports.getSinglePost = (req,res) => {
  Post.findById(req.params.id).then(response =>{
    res.status(200).json({
      message: 'get Successfully',
      post: response
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


