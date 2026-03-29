const heading = document.querySelector('h1');
const secondaryHeading = document.querySelector('h3');

const _date = '1 September 2021 06:30 PM';
let intervalId;

function getDiff() {
  let now = new Date();
  const timeDiff = (now - new Date(_date)) / 1000;
  const years = Math.floor(timeDiff / (3600 * 24 * 365));
  const days = Math.floor((timeDiff / (3600 * 24)) % 30);
  const hours = Math.floor((timeDiff / 3600) % 24);
  const minutes = Math.floor((timeDiff / 60) % 60);
  const seconds = Math.floor(timeDiff % 60);

  console.log({ seconds, minutes, hours, days, years });
}

setInterval(() => {
  getDiff();
}, 1000);
