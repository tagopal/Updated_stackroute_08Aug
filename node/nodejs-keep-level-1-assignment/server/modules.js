/* Replace undefined with Require of your Mongoose connection initialization method */
const db =  require('./db');
const initializeMongooseConnection = db.createMongoConnection;
/* Replace undefined with Require of your note entity*/
const noteModel = require('./api/v1/models/notes');
/* Replace undefined with Require of your user entity*/
const userModel = require('./api/v1/models/user');

module.exports = {
	initializeMongooseConnection,
	noteModel,
	userModel
}