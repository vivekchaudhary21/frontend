// closures

function outer() {
  let x = 2;

  return function inner(y) {
    return x + y;
  };
}

const callOuter = outer();

const inner = callOuter(2);
console.log(inner);
