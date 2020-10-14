const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const searchRoutes = require('./routes/search');
const cartRoutes = require('./routes/cart');
const adminProductRoutes = require('./routes/admin/products');
const categoryRoutes = require('./routes/admin/category');
const path = require('path');
const app = express();

mongoose.connect('mongodb+srv://santu:YJBTLQhBfR7J37QQ@mean-stack-uuvui.mongodb.net/mean-stack?retryWrites=true&w=majority')
.then(() => {
  console.log('connected to database');
})
.catch((err) => {
  console.log('Error on DB connection', err);
});

// const pass = YJBTLQhBfR7J37QQ;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});


app.use('/api/posts', appRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', adminProductRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/cart', cartRoutes);



module.exports = app;
