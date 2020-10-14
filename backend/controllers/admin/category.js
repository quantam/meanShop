const Category = require('../../models/category');

exports.getCategoryList = (req,res) => {
  let fetchedCategories;
  const postQuery = Category.find();
  postQuery
    .then(documents => {
      fetchedCategories = documents;
      return Category.countDocuments();
    }).then(count => {
      res.status(200).json({
        message : 'Success',
        categories: fetchedCategories,
        total: count
      });
    });
};






