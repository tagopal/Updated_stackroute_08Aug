/* Write a Program to convert an array of objects to an object
	based on a given key */

const convert = (arrayObj, keyField) => {
	let outputObj = {};
	let inputArray = Array.isArray(arrayObj);
	if (inputArray === true) {
		let arraylength = arrayObj.length;
		for (let i = 0; i < arraylength; i += 1) {
			outputObj[arrayObj[i][keyField]] = Object.assign({}, arrayObj[i]);
		}
	} else {
		outputObj = null;
	}
	return outputObj;
};

/* For example,
INPUT - convert([{id: 1, value: 'abc'}, {id: 2, value: 'xyz'}], 'id')
OUTPUT - {
			'1': {id: 1, value: 'abc'},
			'2': {id: 2, value: 'xyz'}
		 }


*/

module.exports = convert;
