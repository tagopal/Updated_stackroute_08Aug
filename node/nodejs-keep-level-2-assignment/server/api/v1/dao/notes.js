const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const db = require('../models/notes');
const uuid = require('uuid/v4');

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
        var newnote = db();
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


module.exports = {
    getNotes,
    addNote,
    updateNote
}