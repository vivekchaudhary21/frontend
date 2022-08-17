const _endDate = '31 July 2022 06:30 PM';
const daysInput = document.getElementById('days');
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const timeCol = document.querySelector('.col');
const title = document.querySelector('.title');
let intervalID;

document.getElementById('end-date').innerText = _endDate;

const endDate = new Date(_endDate);

function getTime() {
  if (endDate <= new Date()) {
    timeCol.innerText = '';
    title.innerText = 'We went live on';
    clearInterval(intervalID);
  } else {
    const timeDiff = (endDate - new Date()) / 1000;

    const days = Math.floor(timeDiff / (3600 * 24));
    const hours = Math.floor((timeDiff / 3600) % 24);
    const minutes = Math.floor((timeDiff / 60) % 60);
    const seconds = Math.floor(timeDiff % 60);

    console.log(seconds);

    daysInput.value = days;
    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = seconds;
  }
}

intervalID = setInterval(() => {
  getTime();
}, 1000);
