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

function randomFunc() {
  var obj1 = { name: 'Vihaan', age: 45 };

  return function () {
    console.log(obj1.name + ' is ' + 'awesome'); // Has access to obj1 even when the randomFunc function is executed
  };
}

var initialiseClosure = randomFunc(); // Returns a function

var obj1 = {
  name: 'vivek',
};

initialiseClosure();
