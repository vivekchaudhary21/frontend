/**
 * Working with streams
 */

const decoder = new TextDecoder('utf-8');

const chunks = fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  .then((res) => res.body.getReader().read())
  .then(({ value, done }) => {
    decoder.decode(value);
  });

/**
 * Streams using pipeThrough
 * still experimental
 * this example reads a stream
 */

(async function fetchData(location) {
  const res = await fetch(location, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    console.log('chunk recieved \n', value);
  }

  console.log('all the data recieved');
})('https://icanhazdadjoke.com/');
