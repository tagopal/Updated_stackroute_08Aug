//  Test Configuration Object

const users = {
    user1: { username: 'stranger', password: 'password' },
    user1WithWrongPassword: { username: 'stranger', password: '123' },
    user2: { username: 'sonu', password: 'password' },
};

const mockNotes = {
  noteOne: { title: 'title1', text: 'text1', state: 'not-started', userId: '1' },
  noteTwo: { title: 'title2', text: 'text1', state: 'not-started', userId: '2' }
}

module.exports = {
    users,
    mockNotes
};