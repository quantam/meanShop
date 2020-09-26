const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

exports.createUser = (req,res,next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    })

    user.save().then(result => {
      res.status(200).json({
        message: 'Sign up sucessfully',
        result: result
      })
    }).catch(error => {
      res.status(500).json({
        message: error
      })
    })
  });
};

exports.login = (req,res,next) => {
  let featchedUser;
  User.findOne({email: req.body.email}).then(user => {
    featchedUser = user;
    if(!user){
      res.status(401).json({
        message: 'Authentication failed'
      })
    }
    return bcrypt.compare(req.body.password, user.password);
  }).then(result => {
    if(!result){
      res.status(401).json({
        message: 'Authentication failed'
      })
    }
    const token = jwt.sign(
      {email: featchedUser.email, userId: featchedUser._id},
      'secet_code_here',
      { expiresIn: '1h'}
      );
      res.status(200).json({
        message: 'Sucessfully loggedin',
        token: token,
        userId: featchedUser._id,
        expiresIn: 3600
      });
  }).catch(err => {
    res.status(401).json({
      message: 'Password not match'
    })
  })

};
