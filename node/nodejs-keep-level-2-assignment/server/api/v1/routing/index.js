const router=require('express').Router();
const auth = require('../auth');

const user = require('../modules/users');
const notes= require('../modules/notes');

router.post('/users/register', user.register);
router.post('/users/login', user.login);

router.get('/notes', auth.authenticate,notes.getNotes);
router.put('/notes/:noteId', auth.authenticate,notes.updateNote);
router.post('/notes', auth.authenticate,notes.addNote);

module.exports = router;

