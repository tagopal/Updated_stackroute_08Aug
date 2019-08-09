/* Write a program to build a `Pyramid of stars` of given height */

/*const buildPyramid = (rowcount) => {
    let starPyramid = '';
    if ( parseInt(rowcount, 10) ) {
        for (let i = 0; i <= rowcount; i += 1) {
            for (let j = 0; j <= rowcount-i; j += 1) {
                starPyramid += ' ';
            }
            for (let k = 0; k <= i; k += 1) {
                starPyramid += ' * ';
            }
            starPyramid += ' \n  ';
        }
    }
    return starPyramid;
};*/

const buildPyramid = (height) => {
    let str = '';
    let blsp = ' ';

    if (typeof height === 'number') {

        for (let i = 1; i <= height; i += 1) {
            for (let j = 1; j < (height-(i-2)); j += 1) {
                str += blsp;
            }
            for (let k = 1; k <= i; k += 1) {
                str += "*" + blsp;
            }
            str += blsp + "\n";
        }
    }
    return str;
}

console.log(buildPyramid(5));
/* For example,
INPUT - buildPyramid(6)
OUTPUT -
     *
    * *
   * * *
  * * * *
 * * * * *
* * * * * *

*/

module.exports = buildPyramid;
