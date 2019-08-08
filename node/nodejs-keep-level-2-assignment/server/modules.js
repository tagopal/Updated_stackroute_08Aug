/* Replace undefined with Require of your Mongoose connection initialization method */
const db =  require('./db');
const auth = require('./api/v1/auth');

const initializeMongooseConnection = db.createMongoConnection;
/* Replace undefined with Require of your note entity*/
const noteModel = require('./api/v1/models/notes');
/* Replace undefined with Require of your user entity*/
const userModel = require('./api/v1/models/user');
/* Replace undefined with the method or function reference, which signs the token with given payload, expiry time and secret, call back should have error or signed token */
const signJWTToken = auth.signToken;
/* Replace undefined with the method or function reference, which verifies a given JWT Token and callback with error & payload */
const verifyJWTToken = auth.verifyToken;

module.exports = {
	initializeMongooseConnection,
	noteModel,
	userModel,
	signJWTToken,
	verifyJWTToken
}