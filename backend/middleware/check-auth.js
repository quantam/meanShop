const jwt = require('jsonwebtoken');


module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, 'secet_code_here');
    console.log('decoded', decodedToken);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
  } catch(err){
    res.status(401).json({message: 'Not authorized', error: err});
  }
}
