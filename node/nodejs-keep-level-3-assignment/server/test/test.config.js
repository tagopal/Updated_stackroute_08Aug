const uuidv1 = require('uuid/v1');

//  Test Configuration Object

const users = {
    user1: { username: 'user1', password: 'pass1' },
    user1WithWrongPassword: { username: 'user1', password: '123' },
    user2: { username: 'user2', password: 'pass2' },
    user3: { username: 'user3', password: 'pass3' }
};

const userInfo = {
  user1: { username: 'user1' }
};


const mockNotes = {
  noteOne: { title: 'title1', text: 'text2', state: 'not-started'},
  noteTwo: { title: 'title2', text: 'text2', state: 'not-started'}
}

const payload1 = {
    userName: users.user1.userName,
    userId: uuidv1()
};
const payload2 = {
    userName: users.user2.userName,
    userId: uuidv1()
};
const payload3 = {
    userName: 'testuser',
    userId: uuidv1()
};

module.exports = {
    users,
    mockNotes,
    payload1,
    payload2,
    payload3
};