const router=require('express').Router();
const auth = require('../auth');

const user = require('../modules/users');
const notes= require('../modules/notes');
const noteStream= require('../modules/streams');

router.post('/users/register', user.register);
router.post('/users/login', user.login);

router.get('/notes', auth.authenticate,notes.getNotes);
router.put('/notes/:noteId', auth.authenticate,notes.updateNote);
router.post('/notes', auth.authenticate,notes.addNote);

router.get('/notes/stream',auth.authenticate, noteStream.getNotes);
router.post('/notes/stream',auth.authenticate, noteStream.addNote);
router.post('/notes/share/:userId',auth.authenticate, noteStream.shareNote);

module.exports = router;

