const memoizedFunction = (fn) => {
  let cache = new Map();

  return (...args) => {
    let key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const result = fn.call(this, args);
      cache.set(key, result);
      return result;
    }
  };
};

const factorial = (n) => {
  return n <= 1 ? 1 : n * factorial(n - 1);
};

const factorialMemo = memoizedFunction(factorial);
const fact = factorialMemo(159);
console.log(fact);

/**
 * Compose Function
 * f(g())
 */

function compose(f, g) {
  return (...args) => {
    return f(g(...args));
    // return f.call(this, g.apply(this, args));
  };
}

const square = (x) => x * x;
const sum = (x, y) => x + y;

const composedSumSquared = compose(square, sum)(2, 3);
console.log(composedSumSquared);
