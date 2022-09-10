let sum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};

const callCounter = (fn) => {
  let count = 0;

  return (...args) => {
    console.log(`sum hs been called ${(count += 1)} times`);
    return fn(...args);
  };
};

const sumDecorator = callCounter(sum);

const result1 = sumDecorator(1, 2, 3, 5);
const result2 = sumDecorator(1, 2, 3, 6);
console.log(result1, result2);
