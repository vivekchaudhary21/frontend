const sum = (a, b, c, d) => a + b + c + d;

// function curry(fn) {
//   let finalArguments = [];
//   return function inCurr(...args) {
//     finalArguments.push(...args);
//     if (fn.length > finalArguments.length) {
//       return inCurr;
//     } else {
//       return fn(...finalArguments);
//     }
//   };
// }

// better way

const curry = (fn) => {
  return (curried = (...args) => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  });
};

const curriedSum = curry(sum);

console.log(curriedSum(3, 4, 5, 6));
console.log(curriedSum(3)(4, 5, 6));
console.log(curriedSum(3, 4)(5, 6));
console.log(curriedSum(3)(4)(5)(6));
