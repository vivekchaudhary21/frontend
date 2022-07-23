const progress = document.querySelector('.progress');
const loading = document.querySelector('.loading');

let i = 0;
let arr = [15, 25, 37, 52, 69, 71, 84, 92, 100];

const interval = setInterval(() => {
  progress.style.width = `${arr[i]}%`;
  loading.innerHTML = `${arr[i]}%`;
  i++;
  if (i === arr.length) {
    clearInterval(interval);
    loading.innerHTML = 'Completed';
  }
}, 1000);
