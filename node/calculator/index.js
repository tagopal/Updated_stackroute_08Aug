/* eslint no-console: 0 */

const readlineSync = require('readline-sync');
// @TODO Include calculator module
const calculator = require('./calculator/index');

let options = ['Add', 'Subtract', 'Multiply', 'Division'];

let keepDoing = true;
while (keepDoing) {
  console.log('------------------------------------------------');
  console.log('---              PRESS 0 to Exit             ---');

  let opIndex = readlineSync.keyInSelect(options, 'What operation you want to do?');

  if (opIndex === -1) {
    break;
  } else {
    let lhs = readlineSync.questionInt('Enter first value ');
    let rhs = readlineSync.questionInt('Enter second value ');

    // This is the expected signature of the calculator module
    /* function calculate(operation, {lhs, rhs}) */
    let result = calculator(options[opIndex].split('')[0], { lhs, rhs });

    console.log(`\n\t\tResult of ${options[opIndex]} is ${result}`);
  }
}
console.log("Thanks for using the calculator, bye...!");
