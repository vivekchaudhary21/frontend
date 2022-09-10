const word = document.querySelector('.word');
const hint = document.querySelector('.hint');
const input = document.querySelector('input');
const checkWord = document.querySelector('.check-word');
const timeLeft = document.querySelector('.time-left');

let counter = 0;
let timer = 1;
let intervalId;

const getShuffledWord = (word) => {
  let shuffledWord = '';
  for (let i = word.length - 1; i >= 0; i--) {
    shuffledWord += word[i];
  }
  return shuffledWord;
};

function displayWord() {
  const currentWord = words[counter];
  word.textContent = getShuffledWord(currentWord.word);
  hint.textContent = `Hint: ${currentWord.hint}`;
  input.value = '';

  if (intervalId) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    timeLeft.textContent = `Time left: ${timer}`;
    timer++;
    if (timer === 11) {
      clearInterval(intervalId);
      displayNextWord();
    }
  }, 1000);

  timer === 10 && clearInterval(intervalId);
}

window.addEventListener('load', () => {
  displayWord();
});

function displayNextWord() {
  timer = 1;
  counter++;
  displayWord();
  if (counter === words.length - 1) {
    counter = -1;
  }
}

checkWord.addEventListener('click', () => {
  if (input.value === '') {
    alert('please enter a word');
  } else {
    if (input.value.toLowerCase() === words[counter].word.toLowerCase()) {
      alert('Right');
    } else {
      alert(`Sorry, but the correct word is ${words[counter].word}`);
    }

    displayNextWord();
  }
});
