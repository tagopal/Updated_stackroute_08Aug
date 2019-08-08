function add(lhs, rhs){
  const add1 = lhs + rhs;
  return add1;
}

function sub(lhs, rhs){
  const sub1 = lhs - rhs;
  return sub1;
}

function mul(lhs, rhs){
  const product = lhs * rhs;
  return product;
}

function div(lhs, rhs){
  let div1;
  if (rhs !=0){
     div1 = lhs / rhs;
  }else{
      div1 ="cannot divide by Zero";
  }
  return div1;
}

module.exports = {
  add,
  sub,
  mul,
  div
}