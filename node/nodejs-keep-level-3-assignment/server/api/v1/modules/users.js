const dao= require('../dao/user');
const register = (req,res)=>{
    dao.register(req,res);
};

const login = (req,res)=>{
    dao.login(req,res);
};

module.exports = {register,login};