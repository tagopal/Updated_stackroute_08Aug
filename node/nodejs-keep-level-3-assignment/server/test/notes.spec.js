const should = require('chai').should();
const request = require('supertest');
const path = require('path');
const fs = require('fs');
const app = require('../app').app;
const config = require('./test.config');
const modules = require('../modules');
const auth = require('../api/v1/auth');
const authConfig = require('../config/appConfig');

user1 = config.users.user1;
user2 = config.users.user2;
user3 = config.users.user3;

let noteId = 0;
const baseNotesApi = '/api/v1/notes/?userId='

const findNote = (query, done) => {
  modules.noteModel.findOne(query, (err, note) => {
    if (err) {
      done(err);
    } else {
      done(null, note);
    }
  });
}

function binaryParser(res, callback) {
    res.setEncoding('UTF-8');
    res.data = '';
    res.on('data', function (chunk) {
        res.data += chunk;
    });

    res.on('end', function () {
        callback(null, new Buffer(res.data, 'UTF-8'));
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
    if (err) return done(err);
    done();
  });
});

// clear notes collection
before((done) => {
  modules.noteModel.remove({}, (err) => {
    if (err) return done(err);
    done();
  });
});

function binaryParser(res, callback) {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', function (chunk) {
    res.data += chunk;
  });
  res.on('end', function () {
    callback(null, new Buffer(res.data, 'binary'));
  });
}


function loginUser() {
  return function (done) {
    this.timeout(4000);
    request(app)
      .post('/api/v1/users/register')
      .send(user1)
      .end(function (err, res) {
        request(app)
          .post('/api/v1/users/register')
          .send(user2)
          .end(function (err, res) {
            should.not.exist(err);
            request(app)
              .post('/api/v1/users/register')
              .send(user3)
              .end(function (err, res) {
                request(app)
                  .post('/api/v1/users/login')
                  .expect(200)
                  .send(user1)
                  .end((err, res) => {
                    should.not.exist(err);
                    USER_ID_1 = res.body.user.userId;
                    jwtToken1 = res.body.token;
                    request(app)
                      .post('/api/v1/users/login')
                      .expect(200)
                      .send(user2)
                      .end((err, res) => {
                        USER_ID_2 = res.body.user.userId
                        should.not.exist(err);
                        jwtToken2 = res.body.token;
                        request(app)
                          .post('/api/v1/users/login')
                          .expect(200)
                          .send(user3)
                          .end((err, res) => {
                            USER_ID_3 = res.body.user.userId
                            should.not.exist(err);
                            jwtToken3 = res.body.token;
                            done();
                          });
                      });
                  });
              });
          });
      });
  };
}
// Will be called only once, before executing any testsuit.
before(loginUser());


//  testsuite
describe('Testing to add a note', function () {

  //  testcase
  it('Should handle a request to add a new note for user 1 ', function (done) {
    this.timeout(3000);
    request(app)
      .post('/api/v1/notes?userId=' + USER_ID_1)
      .set('Authorization', 'Bearer ' + jwtToken1)
      .expect(201)
      .expect('Content-Type', /json/)
      .send(config.mockNotes.noteOne)
      .end(function (err, res) {
        should.not.exist(err);
        should.exist(res.body, 'Should return inserted note');
        res.body.text.should.be.equal(config.mockNotes.noteOne.text, 'Should match added note text value');
        noteId = res.body.id;
        findNote({ userId: USER_ID_1, id: noteId }, (error, note) => {
          if (err) {
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
  it('Should handle a request to add a new note for user 2', function (done) {
    // Should get added note of user 2 as a respone,  need to match added note text value
    // status = 201
    // response will be added note object
    const note2 = config.mockNotes.noteTwo;
    request(app)
      .post(`${baseNotesApi}${USER_ID_2}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .send(note2)
      .expect(201)
      .end((error, response) => {
        if (error) return done(error);
        should.equal(response.body.text, note2.text, 'response should return proper note text');
        done();
      });
  });
});
//  testsuite
describe('Testing to get all notes', function () {
  //  testcase
  it('Should handle a request to get all notes of a user 1', function (done) {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    const note1 = config.mockNotes.noteOne;
    request(app)
      .get(`${baseNotesApi}${USER_ID_1}`)
      .set('Authorization', `Bearer ${jwtToken1}`)
      .expect(200)
      .end((error, response) => {
        if (error) return done(error);
        const notes = response.body;
        should.equal(notes[notes.length - 1].text, note1.text, 'response should return proper note text');
        done();
      });
  });
  //  testcase
  it('Should handle a request to get all notes of a user 2', function (done) {
    // Should get all note as a array those are created by user 2 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 2
    const note2 = config.mockNotes.noteTwo;
    request(app)
      .get(`${baseNotesApi}${USER_ID_2}`)
      .set('Authorization', `Bearer ${jwtToken2}`)
      .expect(200)
      .end((error, response) => {
        if (error) return done(error);
        const notes = response.body;
        should.equal(notes[notes.length - 1].text, note2.text, 'response should return proper note text');
        done();
      });
  });
  //  testcase
  it('Should handle a request to get notes of a user who has not created any note', function (done) {
    // should get blank array
    // status = 200
    // response will be an empty array
    request(app)
      .get(`${baseNotesApi}{USER_ID_3}`)
      .set('Authorization', `Bearer ${jwtToken3}`)
      .expect(200)
      .end((error, response) => {
        if (error) return done(error);
        should.equal(response.body.length, 0, 'response should return empty array');
        done();
      });
  });
});
//  testsuite
describe('Testing to update a note', function () {
  //  testcase
  it('Should handle a request to update a note by note id', function (done) {
    // Should return updated note and match updated note text value'
    // status = 200
    // response will hold updated note as an object
    const note1 = config.mockNotes.noteOne;
    note1.text = "updated text";
    note1.id = noteId;
    request(app)
      .put(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${jwtToken1}`)
      .expect(200)
      .send(note1)
      .end((error, response) => {
        if (error) return done(error);

        should.equal(response.body.text, 'updated text', 'response should return updated text');
        done();
      });
  });
});

//  testsuite
describe('Notes Streams - Adding and Retrieving notes', function () {

  //  testcase
  it('Should handle a request to add a new note for user 1 ', function (done) {

    this.timeout(3000);
    request(app)
      .post('/api/v1/notes/stream?userId=' + USER_ID_1)
      .set('Authorization', 'Bearer ' + jwtToken1)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        should.not.exist(err);
        should.exist(res.body, 'Should return message');
        res.body.message.should.be.equal('Completed the request', 'Should return message Completed the request');
        done();
      });

  });

  //  testcase
  it('Should handle a request to get all notes of a user 1', function (done) {
    // Should get all note as a array those are created by user 1 and Should match recently added note text value
    // status = 200
    // response will be a array or all notes those are added by user 1
    
      request(app)
        .get('/api/v1/notes/stream?userId=' + USER_ID_1)
        .set('Authorization', 'Bearer ' + jwtToken1)
        .buffer()
        .parse(binaryParser)
        .end(function(err, res) {
            if (err) return done(err);
            should.exist(Buffer.isBuffer(res.body));
            done();
        });
  });
});

//  testsuite
describe('Share Notes', function () {

  //  testcase
  it('Should share note to the user ', function (done) {

     modules.noteModel.find({userId:USER_ID_1}, (err, notes) => {
        if (err) {
          done(err);
        } else {
            let noteIds = [];
            notes.forEach((item)=>{
              noteIds.push(item.id);
            })
            request(app)
            .post('/api/v1/notes/share/' + USER_ID_2)
            .set('Authorization', 'Bearer ' + jwtToken1)
            .send(noteIds)
            .end(function (err, res) {
              should.not.exist(err);
              should.exist(res.body, 'Should return message');
              done();
            });
        }
      });
    
  });

});