/* Write a Program to Flatten a given n-dimensional array */
const flatten = (array) => {
	if (array.length !==0) {
		if (Array.isArray(array)) {
			return Array.isArray(array) ? [].concat.apply([], array.map(flatten)) : array;
		}		
	} 
	return array;
};

/* For example,
INPUT - flatten([1, [2, 3], [[4], [5]])
OUTPUT - [ 1, 2, 3, 4, 5 ]

*/

module.exports = flatten;