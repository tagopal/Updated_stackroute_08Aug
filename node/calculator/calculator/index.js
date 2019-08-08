// @TODO include your math operation modules
const math = require('../mathoperation/index')

/**
 * Function for calculating simple math operations
 * operation : A single character for specifying the type of operations to perform
 * lhs : Value on the left hand side of the equation/operator
 * rhs : Value on the right hand side of the equation/operator
 */
function calculate(operation, {lhs, rhs}) {
  let result = undefined;
  switch(operation) {
    case 'A':
    case 'a':
      result = math.add(lhs, rhs);
      break;
    case 'S':
    case 's':
      result = math.sub(lhs, rhs);
      break;
    case 'M':
    case 'm':
      result = math.mul(lhs, rhs);
      break;
    case 'D':
    case 'd':
      if (rhs !=0){
        result = math.div(lhs, rhs);
      }else{
        result ="cannot divide by Zero";
      }
      break;
    default:
      result = 'Unknown operation';
      break;
  }

  return result;
}

module.exports = calculate;