const mongoose = require('mongoose');
const MONGO_URL='mongodb://localhost:27017/node1DB';

function createMongoConnection(){
    return mongoose.connect(MONGO_URL,{useNewUrlParser:true});
}

function getMongoConnection(){
    return mongoose.connection;
}

function onError(err){
    //console.log("Error in database connection "+err);
}

function onSuccess(){
   // console.log('Connected to mongo database');
}

module.exports = {
    createMongoConnection,
    getMongoConnection,
    onError,
    onSuccess
}