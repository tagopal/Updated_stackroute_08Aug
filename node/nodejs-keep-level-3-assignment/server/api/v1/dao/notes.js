const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../models/notes');
const uuid = require('uuid/v4');
const userdb = require('../models/user');
const data = require('../../../mock_notes.json');
const streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB;
const JSONStream      = require('JSONStream');
const fs              = require('fs');
const es=require('event-stream');
const request=require('request');
const outputDBConfig = { dbURL: 'mongodb://localhost:27017/testDB', collection: 'notes' };

const getNotes = (req, res) => {
    db.find({ userId: req.query.userId }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        else {
            res.status(200).send(result);          
        }
    });
};


const addNote = (req, res) => {
    try{
        var newnote = new db();
        newnote.id = uuid();
        newnote.title = req.body.title;
        newnote.text = req.body.text;
        newnote.state = req.body.state;
        newnote.userId = req.query.userId;
        newnote.save((err, result) => {
            if (err) {
                res.status(400).send({ message: "unexpected error" });
            } else {
                res.status(201).send(result);
            }
        });
    }catch(err){
        res.status(404).send({message: 'Failed to complete request'});
    } 
};

const updateNote = (req, res) => {
    db.findOneAndUpdate({id: req.params.noteId },{$set:{title:req.body.title,text:req.body.text,state:req.body.state}},{new:true}, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        else {
            res.status(200).send(result);          
        }
    });
};

const getNotesStream = (req, res) => {
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

const addNotesStream = (req, res) => {
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

const shareNotes = (req, res) => {

    let postedNotes = req.body;

    userdb.findOneAndUpdate(
        { userId: req.params.userId },
        {
            $set: {
                sharedNotes: postedNotes
            }
        },
        (err, notes) => {
            if (err) {
                console.log(err);
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
    updateNote,
    getNotesStream,
    addNotesStream,
    shareNotes
}