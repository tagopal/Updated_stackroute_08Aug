const mongoose = require('mongoose');
const notesModel = require('../models/notes');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

const getNotes = (req, res) => {
    // console.log("req.body :",req.body);
    notesModel.find({ userId: req.query.userId }, (err, result) => {
        if (err) {
            res.status(500).send({ message: "unexpected error" });
        }
        else {
            res.status(200).send(result);          
        }
    });
};

const addNote = (req, res) => {
    // console.log("req.body :",req.body);
    let note =new notesModel();
    note.id = uuid();
    note.title = req.body.title;
    note.text = req.body.text;
    note.state = req.body.state;
    note.userId = req.query.userId||req.body.userId;
    // console.log("note :",JSON.stringify(note));
    note.save((err, newNote) => {
        if (err) {            
            // console.log("Error from db",err);
            res.status(400).send({ message: "unexpected error" });
        } else {
            res.status(201).send(newNote);
        }
    });
};


const updateNote = (req, res) => {
    notesModel.findOneAndUpdate({id: req.params.noteId },{$set:{title:req.body.title,text:req.body.text,state:req.body.state}},{new:true}, (err, result) => {
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