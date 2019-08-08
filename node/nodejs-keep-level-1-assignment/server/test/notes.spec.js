const should = require('chai').should();
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const modules = require('../modules');
const notesModel = require('../api/v1/models/notes');

const USER_ID_1 = '1';
const USER_ID_2 = '2';
let noteID = 0;
const baseNotesApi = '/api/v1/notes/?userId='


// Initialize Database
before((done)=>{
  modules.initializeMongooseConnection().then(()=>{done();});
});


// Clear data
before((done) => {
  notesModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});


//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
     const note = config.mockNotes.noteOne;
     request(app)
      .post(`${baseNotesApi}${USER_ID_1}`)
      .send(note)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        should.equal(response.body.text, note.text,'Response should return note');
        noteID = response.body.id;
        // console.log("1 ",response.body);
        done();
      });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
     const note = config.mockNotes.noteTwo;
     request(app)
      .post(`${baseNotesApi}${USER_ID_2}`)
      .send(note)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        // console.log("2",response.body);
        should.equal(response.body.text, note.text,'Response should return note');
        done();
      });
  });
});


//  testsuite
describe('Testing to get all notes', function()
{
  //  testcase
  it('Should handle a request to get all notes of a user 1', function(done)
  {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    const note = config.mockNotes.noteOne;
    request(app)
      .get(`${baseNotesApi}${USER_ID_1}`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        // console.log("res body",notes);
        should.equal(notes[notes.length-1].text, note.text,'Response should return list of notes');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
     const note = config.mockNotes.noteTwo;
    request(app)
      .get(`${baseNotesApi}${USER_ID_2}`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        // console.log("res body",notes);
        should.equal(notes[notes.length-1].text, note.text,'Response should return list of notes');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    // should get blank array
    // status = 200
    // response will be an empty array
      const note = config.mockNotes.noteTwo;
    request(app)
      .get(`${baseNotesApi}3`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        // console.log("notes :",notes);
        should.equal(notes.length, 0,'Response should return an empty list of notes');
        done();
      });
  });
});

//  testsuite
describe('Testing to update a note', function()
{
  //  testcase
  it('Should handle a request to update a note by note id', function(done)
  {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    let note = config.mockNotes.noteOne;
    note.text = "Updated Text";
    note.id = noteID;    
    //console.log(note);
    request(app)
        .put(`/api/v1/notes/${noteID}`)
        .expect(200)
        .send(note)
        .end((error, response) => {
          if(error) return done(error);
          should.equal(response.body.text, note.text, 'Response should contain updated note');
          done();
        });
  });
});
