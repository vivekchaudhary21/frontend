const obj = {
  a: 1,
  b: 2,
};

export const { a, b } = obj;

function countToTen(num = 1) {
  if (num > 10) {
    return;
  }
  console.log(num);
  countToTen(num + 1);
}

countToTen();

const curry = (fn) => {
  let curried;
  return (curried = (...args) => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }

    return fn(...args);
  });
};

const total = (x, y, z) => x + y + z;

const curriedTotal = curry(total);
console.log(curriedTotal(10)(20)(30));

let fn = (a, b, c) => {
  console.log(a, b, c);
};

fn = fn.bind(null, 7, 9, 10);

console.log(fn());
