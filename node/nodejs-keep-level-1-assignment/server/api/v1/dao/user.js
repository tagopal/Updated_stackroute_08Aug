const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userdb = require('../models/user');
const uuid = require('uuid/v4');

const userRegister = (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    userdb.findOne({ userName: name }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }        
        if (result) {
            res.status(403).send({ message: "username is already exist" });
        } else {        
            let newuser = new userdb();
            newuser.userName = name
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

const userLogin = (req, res) => {
    var name = req.body.username;
    var pass = req.body.password;
    userdb.findOne({ userName: name }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        if (result) {
            if(comparePassword(pass,result.password)){
                res.status(200).send({user:{userName:result.userName}});
                
            } else {
                res.status(403).send({ message: "Password is incorrect" });
            }
        } else {
           res.status(403).send({ message: "You are not registered user" });
        }
    });
};

const getHashedPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (inputPassword,dbPassword) =>{
    return bcrypt.compareSync(inputPassword, dbPassword); 
};



module.exports = {
    userRegister,
    userLogin
}