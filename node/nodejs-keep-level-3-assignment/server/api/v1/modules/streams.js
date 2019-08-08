// const dao= require('../dao/streams');

// const shareNotes = (req,res)=>
// {
//     dao.shareNotes(req,res);
// };

// const getNotesStream = (req,res)=>
// {
//     dao.getNotesStream(req,res);
// };

// const addNotesStream = (req,res)=>
// {
//     dao.addNotesStream(req,res);
// };


// module.exports = {shareNotes,getNotesStream,addNotesStream};

const dao= require('../dao/streams');
const getNotes = (req,res)=>{
    dao.getNotes(req,res);
};

const addNote = (req,res)=>{
    dao.addNote(req,res);
};

const shareNote = (req,res)=>{
	dao.shareNote(req,res);
};


module.exports = {getNotes,addNote,shareNote};