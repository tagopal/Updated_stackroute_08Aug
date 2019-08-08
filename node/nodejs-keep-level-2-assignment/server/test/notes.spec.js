const should = require('chai').should();
const request = require('supertest');
const app = require('../app');
const config = require('./test.config');
const modules = require('../modules');
const auth = require('../api/v1/auth');
const authConfig = require('../config/appConfig');

let user1 = config.users.user1;
let user2 = config.users.user2;
let user3 = config.users.user3;
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QiLCJ1c2VySWQiOjEyMywiaWF0IjoxNTQwMjkzNDIyLCJleHAiOjE1NDAyOTM0MjV9.E-zvsUnvarM0O8e-J8xmxzE7F2V4ZElaIUHHq4LE4PA';


let noteId = 0;
const baseNotesApi = '/api/v1/notes/?userId='

const findNote = (query, done) => {
  modules.noteModel.findOne(query, (err, note)=> {
    if(err) {
      done(err);
    } else {
      done(null, note);
    }
  });
}

// Initialize db connection before all tests
before((done) => {
  modules.initializeMongooseConnection()
    .then(() => {
      done();
    });
});

// clear users collection
before((done) => {
  modules.userModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});

// clear notes collection
before((done) => {
  modules.noteModel.remove({}, (err) => {
    if(err) return done(err);
    done();
  });
});


function loginUser()
{
  return function(done)
  {
    this.timeout(4000);
    request(app)
    .post('/api/v1/users/register')
    .send(user1)
    .end(function(err, res) {
      request(app)
      .post('/api/v1/users/register')
      .send(user2)
      .end(function(err, res) {
        should.not.exist(err);
        request(app)
        .post('/api/v1/users/register')
        .send(user3)
        .end(function(err, res) {
          request(app)
          .post('/api/v1/users/login')
          .expect(200)
          .send(user1)
          .end((err, res) => {
            should.not.exist(err);
            USER_ID_1 = res.body.user.userId;
            jwtToken1  = res.body.token;
            request(app)
            .post('/api/v1/users/login')
            .expect(200)
            .send(user2)
            .end((err, res) => {
              USER_ID_2 = res.body.user.userId
              should.not.exist(err);
              jwtToken2  = res.body.token;
              request(app)
              .post('/api/v1/users/login')
              .expect(200)
              .send(user3)
              .end((err, res) => {
                USER_ID_3 = res.body.user.userId
                should.not.exist(err);
                jwtToken3  = res.body.token;
                done();
              });
            });
          });
        });
      });
    });
  };
};
// Will be called only once, before executing any testsuit for authnetication and authorization verification.
before(loginUser());

//  testsuite
describe('Testing to add a note', function()
{
  //  testcase
  it('Should handle a request to add a new note for user 1 ', function(done)
  {
    // Should get added note of user 1 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    this.timeout(3000);
    request(app)
    .post('/api/v1/notes?userId='+USER_ID_1)
    .set('Authorization', 'Bearer ' + jwtToken1)
    .expect(201)
    .expect('Content-Type', /json/)
    .send(config.mockNotes.noteOne)
    .end(function(err, res) {
      should.not.exist(err);
      should.exist(res.body, 'Should return inserted note');
      res.body.text.should.be.equal(config.mockNotes.noteOne.text, 'Should match added note text value');
      noteId = res.body.id;
      findNote({userId: USER_ID_1, id: noteId}, (error, note)=> {
        if(err) {
          should.not.exist(error);
          done();
        } else {
          should.exist(note, 'Returning null as a response, should return inserted note');
          note.text.should.be.equal(config.mockNotes.noteOne.text);
          done();
        }
      });
    });
  });

  //  testcase
  it('Should handle a request to add a new note for user 2', function(done)
  {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    // Pass valid token in Authorization header as Bearer
    const note2 = config.mockNotes.noteTwo;
    request(app)
      .post(`${baseNotesApi}${USER_ID_2}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send(note2)
      .expect(201)
      .end((error, response) => {
        if(error) return done(error);
        should.equal(response.body.text, note2.text,'response should return proper note text');
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
    // Pass valid token in Authorization header as Bearer
    const note1 = config.mockNotes.noteOne;
    request(app)
      .get(`${baseNotesApi}${USER_ID_1}`)
      .set('Authorization', `Bearer ${jwtToken1}`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        should.equal(notes[notes.length - 1].text, note1.text,'response should return proper note text');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get all notes of a user 2', function(done)
  {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    // Pass valid token in Authorization header as Bearer
    const note2 = config.mockNotes.noteTwo;
    request(app)
      .get(`${baseNotesApi}${USER_ID_2}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        const notes = response.body;
        should.equal(notes[notes.length - 1].text, note2.text,'response should return proper note text');
        done();
      });
  });

  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function(done)
  {
    // should get blank array
    // status = 200
    // response will be an empty array
    // Pass valid token in Authorization header as Bearer
    request(app)
      .get(`${baseNotesApi}{USER_ID_3}`)
      .set('Authorization', `Bearer ${jwtToken3}`)
      .expect(200)
      .end((error, response) => {
        if(error) return done(error);
        should.equal(response.body.length, 0, 'response should return empty array');
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
    // Pass valid token in Authorization header as Bearer
    const note1 = config.mockNotes.noteOne;
    note1.text = "updated text";
    note1.id = noteId; 
    request(app)
        .put(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${jwtToken1}`)
        .expect(200)
        .send(note1)
        .end((error, response) => {
          if(error) return done(error);          
          should.equal(response.body.text, 'updated text', 'response should return updated text');
          done();
        });
  });
});

describe('Negative test scenarios', function() {
    it('Make a API request to a resource with invalid token, which requires authentication, should return forbidden status and error ', function(done) { 
      request(app)
      .get(`${baseNotesApi}{USER_ID_3}`)
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(403)
      .end((error, response) => {       
        should.equal(response.text, 'invalid token', 'response should return error message');
        if(error) return done(error);
        done();
      });
    });


    it('Make a API request to a resource without any token, which requires authentication, should return forbidden status and error ', function(done) {
      request(app)
      .get(`${baseNotesApi}{USER_ID_3}`)
      .expect(403)
      .end((error, response) => {           
        // console.log("negative ",response);      
        should.equal(response.text, 'Not authenticated', 'response should return error message');
        if(error) return done(error);
        done();
      });
    });
});
