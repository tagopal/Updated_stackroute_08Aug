const jwt = require('jsonwebtoken');
const appCofig = require('../../config/appConfig');

const signToken = (payload, secret, expireIn, callback) => {
    jwt.sign(payload, secret, { expiresIn: expireIn}, (err, token) =>{
        if(err) return callback(err.message); 
        return callback(null,token); 
    });
};

const verifyToken  = (token, secret, callback) =>{
    jwt.verify(token,secret,(err, decoded) =>{
      if(err) return callback(err.message);
        return callback(null,decoded); 
    });
}

const authenticate = (req, res, next) => {
    
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        postedToken = req.headers.authorization.split(' ')[1];
        verifyToken(postedToken,appCofig.secretkey,(err,decoded)=>
        {
            if(err){
                 res.status(403).send('invalid token');   
            }else{
                req.userId = decoded.userId;
                next();
            }
        })
    } else {
        res.status(403).send('Not authenticated');
    }
}

module.exports = {
    verifyToken,
    signToken,
    authenticate
};