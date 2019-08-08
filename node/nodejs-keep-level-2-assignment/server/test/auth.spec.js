const expect = require('chai').expect;
const { signJWTToken, verifyJWTToken } = require('../modules');
const authConfig = require('../config/appConfig');
const config = require('./test.config');
let testToken = '';
let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QiLCJ1c2VySWQiOjEyMywiaWF0IjoxNTQwMjkzNDIyLCJleHAiOjE1NDAyOTM0MjV9.E-zvsUnvarM0O8e-J8xmxzE7F2V4ZElaIUHHq4LE4PA';
let expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYWFkMTM4MC02NWJkLTExZTktYWMyYy0yOWRmOWY0NzhmYmMiLCJpYXQiOjE1NTYwMjAxMTksImV4cCI6MTU1NjA1NjExOX0.Lwu8M5diuBafLJff0Y2jjw4s9t_Jv-r12zN2SsIYv8o';

describe('JWT Token test scenarios', function() {
	before(function(done) { done(); });
	after(function(done) { done(); });

	it('Assert signing & verification methods exists and are valid', function() {
		expect(signJWTToken).to.not.equal(undefined);
		expect(signJWTToken).to.not.equal(null);
		expect(typeof(signJWTToken)).to.equal('function');
		expect(signJWTToken.length).to.be.above(0, 'this method must have arguments');
		expect(verifyJWTToken).to.not.equal(undefined);
		expect(verifyJWTToken).to.not.equal(null);
		expect(typeof(verifyJWTToken)).to.equal('function');
		expect(verifyJWTToken.length).to.be.above(0, 'this method must have arguments');
		expect(signJWTToken).to.be.an('function');
	});

	it('sign a token with valid payload, signature, secret and expiry time', function(done) { 
		signJWTToken(config.payload1, authConfig.secretkey, '10h', (err, token) => {
			if (err) return done(err);
			testToken = token;
			expect(token).to.not.equal(null);
			expect(token.length).to.be.above(0);
			done();
		});
	});
	it('verification of a valid signed token, must return same payload, which was passed', function(done) {
	 verifyJWTToken(testToken, authConfig.secretkey, (err, decoded) => {
			if (err) return done(err);
			expect(config.payload1.userId).to.be.equal(decoded.userId);
			expect(config.payload1.userName).to.be.equal(decoded.userName);
			done();
		});
	});
	it('verification a expired token, must return with appropriate error', function(done) {
		verifyJWTToken(expiredToken, authConfig.secretkey, (err, decoded) => {
			if (err) {
				expect(err).to.equal('jwt expired');
				done();
			}
		});
	});
	
	it('verification a invalid, must return with appropriate error', function(done) {
	 verifyJWTToken('dsdsds', authConfig.secretkey, (err, decoded) => {
			if (err) {
				expect(err).to.equal('jwt malformed');
				done();
			}
			else {
				return done('invalid token test case failed');
			}
		});
	});

});