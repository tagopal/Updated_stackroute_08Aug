const assert = require('chai').assert;
const calculator = require('../calculator/index');
// Expecting the signature of the calculator to be like below
/* function calculate(operation, {lhs, rhs}) */

describe('calculator testing', function() {
	describe('Addition functionality testing', function() {
		it('Add two positive numbers, returning get positive sum', function(done) {
			const result = calculator('A',{ lhs: 1 , rhs: 2 });
			assert.equal(result,3,"Sum of positive number will give return positive number");
			done();
		});

		it('Add two negative numbers, returning get negative sum', function(done) {
			const result = calculator('A',{ lhs: -1 , rhs: -2 });
			assert.equal(result,-3,"Sum of negative number will return a negative number");
			done();
		});

		it('Add two number, with either of them is negative, producing subtracted output', function(done) {
			const result = calculator('A',{ lhs: -1 , rhs: 2 });
			assert.equal(result,1,"Sum of positive and negative number will return subtracted value");
			done();
		});

		it('Add zeros, produces zero', function(done) {
			const result = calculator('A',{ lhs: 0 , rhs: 0 });
			assert.equal(result,0,"Sum of zero should be zero");
			done();

		});
	});

	describe('Subtraction functionality testing', function() {
		it('Subtract two positive numbers, returning get positive subtraction', function(done) {
			const result = calculator('S',{ lhs: 3 , rhs: 2 });
			assert.equal(result,1,"Subtration of two positive number");
			done();
		});

		it('Subtract two negative numbers, returning get negative subtraction', function(done) {
			const result = calculator('S',{ lhs: -3 , rhs: -2 });
			assert.equal(result,-1,"Subtration of two negative number");
			done();
		});

		it('Subtract two number, with either of them is negative, producing sum output', function(done) {
			const result = calculator('S',{ lhs: -3 , rhs: 2 });
			assert.equal(result,-5,"Subtration of two number with either of them is negative");
			done();
		});

		it('Subtract zeros, produces zero', function(done) {
			const result = calculator('S',{ lhs: 0 , rhs: 0 });
			assert.equal(result,0,"Subtration of Zero");
			done();
		});
	});

	describe('Multiplication functionality testing', function() {

		it('Multiply two positive numbers, returning get positive Multiplication', function(done) {
			const result = calculator('M',{ lhs: 3 , rhs: 2 });
			assert.equal(result,6,"Multiplication of two positive number");
			done();
		});

		it('Multiply two negative numbers, returning get positive Multiplication', function(done) {			
			const result = calculator('M',{ lhs: -3 , rhs: -2 });
			assert.equal(result,6,"Multiplication of two negative number returns a positive number");
			done();
		});

		it('Multiply two number, with either of them is negative, producing negative multiplication output', function(done) {
			const result = calculator('M',{ lhs: 3 , rhs: -2 });
			assert.equal(result,-6,"Multiplication of negative number with  a postive number returns negative number");
			done();
		});

		it('Multiply zeros, produces zero', function(done) {
			const result = calculator('M',{ lhs: 0 , rhs: 0 });
			assert.equal(result,0,"Multiplication of Zero will yield Zero");
			done();
		});
	});

	describe('Division functionality testing', function() {
		it('Divide two positive numbers, returning get positive Multiplication', function(done) {
			const result = calculator('D',{ lhs: 8 , rhs: 2 });
			assert.equal(result,4,"Division of two Positive number");
			done();
		});

		it('Divide two negative numbers, returning get positive Multiplication', function(done) {
			const result = calculator('D',{ lhs: -8 , rhs: -2 });
			assert.equal(result,4,"Division of two negative number to yield positive number");
			done();
		});

		it('Divide two number, with either of them is negative, producing negative Division output', function(done) {
			const result = calculator('D',{ lhs: -8 , rhs: 2 });
			assert.equal(result,-4,"Division of negative number to yield negative number");
			done();
		});

		it(`Should not divide by 0, producing 'Can't divide by zero' message`, function(done) {
			const result = calculator('D',{ lhs: 4, rhs: 0 });
			assert.equal(result, "cannot divide by Zero", "Should not divide by Zero");
			done();
		});
	});
});
