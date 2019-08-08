const dao= require('../dao/notes');
const getNotes = (req,res)=>{
    dao.getNotes(req,res);
};

const addNote = (req,res)=>{
    dao.addNote(req,res);
};

const updateNote = (req,res)=>{
    dao.updateNote(req,res);
};

module.exports = {getNotes,addNote,updateNote};