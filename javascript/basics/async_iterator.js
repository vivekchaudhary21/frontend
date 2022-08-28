const srcArr = [
  'https://eloux.com/async_js/examples/1.json',
  'https://eloux.com/async_js/examples/2.json',
  'https://eloux.com/async_js/examples/3.json',
];

// Custom Async Iterator
srcArr[Symbol.asyncIterator] = function () {
  let i = 0;
  return {
    async next() {
      if (i === srcArr.length) {
        return {
          done: true,
        };
      }
      const url = srcArr[i++];
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('unable to recieve data from ', url);
      }

      const result = await response.json();
      return {
        value: result.firstName.toUpperCase(),
        done: false,
      };
    },
  };
};

(async function () {
  for await (const url of srcArr) {
    console.log(url);
  }
})();

// or you can directly use for await of which behind the scenes calls Symbol.AsyncIterator function

(async function () {
  for await (const url of srcArr) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.firstName);
  }
})();
