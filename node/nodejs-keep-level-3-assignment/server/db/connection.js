// write your db connection code here
const mongoose = require('mongoose');
const MONGO_URL='mongodb://localhost:27017/testDB';

function createMongoConnection(){
    return mongoose.connect(MONGO_URL,{useNewUrlParser:true});
}

function getMongoConnection(){
    return mongoose.connection;
}

function onError(err){
}

function onSuccess(){
}

module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}