const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userdb = require('../models/user');
const uuid = require('uuid/v4');
const auth = require('../auth');
const appCofig = require('../../../config/appConfig');

const register = (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    userdb.findOne({ userName: name }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        
        if (result) {
            res.status(403).send({ message: "username is already exist" });
        } else {
        
            let newuser = userdb();
            newuser.userName = name;
            newuser.password = getHashedPassword(pass);
            newuser.save((err, newuser) => {

                if (err) {
                    res.status(500).send({ message: "unexpected error" });
                } else {
                    res.status(201).send({ userInfo:newuser.userName});
                }
            });
        }
    });
};

const login = (req, res) => {

    var name = req.body.username;
    var pass = req.body.password;

    userdb.findOne({ userName: name }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        if (result) {
            if(comparePassword(pass,result.password)) {
                auth.signToken({userName: result.userName, userId: result._id}, appCofig.secretkey, appCofig.expireIn, (err, token) => {
                    if(err){
                        res.status(403).send({ message: "invalid token" });
                    }else{
                         res.status(200).send({
                            user: {userName: result.userName, userId: result._id},
                            token: token
                        });
                    }
                });
                
            } else {
                res.status(403).send({ message: "Passwords is incorrect" });
            }
        } else {
           res.status(403).send({ message: "You are not registered user" });
        }
    });
};

const getHashedPassword = (password) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (inputPassword,dbPassword) =>{
    return bcrypt.compareSync(inputPassword, dbPassword); 
};



module.exports = {
    register,
    login
}