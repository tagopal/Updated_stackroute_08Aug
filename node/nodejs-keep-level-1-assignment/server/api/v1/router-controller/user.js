const dao= require('../dao/user');
const register = (req,res)=>{
    // console.log("req.body :",req.body);
    dao.userRegister(req,res);
};

const login = (req,res)=>{
    dao.userLogin(req,res);
};

module.exports = {register,login};