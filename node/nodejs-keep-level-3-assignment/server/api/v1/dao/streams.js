const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const data = require('../../../mock_notes.json');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const es=require('event-stream');
const request=require('request');
const JSONStream = require('JSONStream');
const fs = require('fs');
const db = require('../models/notes');
const userdb = require('../models/user');
const outputDBConfig = { dbURL: 'mongodb://localhost:27017/testDB', collection: 'notes' };


const getNotes = (req, res) => {
    try{
        db
        .find()
        .cursor()
        .pipe(JSONStream.stringify())
        .pipe(res.type('json'))
    }
    catch (err) {
        res.status(404).send({ message: 'Failed to complete request' });
    }
};

   
const addNote = (req, res) => {
    // create the writable stream
    try{
         const writableStream = streamToMongoDB(outputDBConfig);     
        //create readable stream and consume it
        fs.createReadStream('./server/mock_notes.json')
            .pipe(JSONStream.parse('*'))
            .pipe(writableStream);
        writableStream.on('finish', function(){ res.status(201).send({ message: 'Completed the request' }); });
    }catch(err){
        res.status(404).send({ message: 'Failed to complete request' });
    }
};

const shareNote = (req, res) => {
    let postedNotes = req.body;
    userdb.findOneAndUpdate(
        { userId: req.params.userId },
        {
            $set: {
                sharedNote: postedNotes
            }
        },
        (err, notes) => {
            if (err) {
                res.status(500).send({ message: "unexpected error" });
            } else {                
                var io = req.app.get('socketio');
                io.sockets.emit (req.params.userId, "notes has been shared with you");
                res.status(200).send({message: 'Completed the request'});
            }
        });        
};

module.exports = {
    getNotes,
    addNote,
    shareNote
}