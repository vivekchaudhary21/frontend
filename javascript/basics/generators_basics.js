const collection = {
  a: 10,
  b: 20,
  c: 30,
  [Symbol.iterator]: function* () {
    for (let key in this) {
      yield this[key];
    }
  },
};

const iterator = collection[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

/**
 * Async generators returns promise
 */

const srcArr = [
  'https://eloux.com/async_js/examples/1.json',
  'https://eloux.com/async_js/examples/2.json',
  'https://eloux.com/async_js/examples/3.json',
];

srcArr[Symbol.asyncIterator] = async function* () {
  let i = 0;
  for (const url of this) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Unable to reveive data from ', url);
    }

    yield response.json();
  }
};

const asyncIterator = srcArr[Symbol.asyncIterator]();

asyncIterator.next().then((result) => {
  console.log(result.value.firstName);
});
