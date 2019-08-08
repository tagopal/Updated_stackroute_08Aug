const router = require('express').Router();

//write your routes here
const user = require('../router-controller/user');
const notes = require('../router-controller/notes');

router.post('/users/register', user.register);
router.post('/users/login', user.login);

router.get('/notes', notes.getNotes);
router.put('/notes/:noteId', notes.updateNote);
router.post('/notes', notes.addNote);


// console.log("Inside router index");
module.exports = router;