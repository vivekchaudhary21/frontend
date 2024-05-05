const number = document.querySelector('.number')
const input = document.querySelector('input')
const checkButton = document.querySelector('.check')
const againButton = document.querySelector('.again')
const guessText = document.querySelector('.message')
const scoreLabel = document.querySelector('.score')
const highScoreLabel = document.querySelector('.highscore')

let highscore = 0
let currentScore = 20
const magicalNumber = Math.floor(Math.random() * 20) + 1

checkButton.addEventListener('click', guessTheNumber)
againButton.addEventListener('click', playAgain)

function guessTheNumber() {
  if (!input.value) {
    return
  }
  const number = Number(input.value)
  console.log(number, magicalNumber)
  if (number === magicalNumber) {
    guessText.textContent = 'Correct number'
    guessedCorrectNumber()
  } else if (number > magicalNumber) {
    guessText.textContent = 'Too high'
    currentScore--
    scoreLabel.textContent = currentScore
  } else {
    guessText.textContent = 'Too low'
    currentScore--
    scoreLabel.textContent = currentScore
  }
}

function playAgain() {
  input.value = ''
  input.disabled = false
  checkButton.disabled = false
  guessText.textContent = 'Start guessing...'
  currentScore = 20
  number.textContent = '?'
  scoreLabel.textContent = currentScore
}

function guessedCorrectNumber() {
  number.textContent = magicalNumber
  input.value = ''
  input.disabled = true
  checkButton.disabled = true
  highScoreLabel.textContent = Math.max(
    +highScoreLabel.textContent,
    currentScore
  )
}
