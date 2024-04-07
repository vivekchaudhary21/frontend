const numberInput = document.querySelector('.guess')
const checkButton = document.querySelector('.check')
const message = document.querySelector('.message')

checkButton.addEventListener('click', () => {
  const guess = Number(numberInput.value)

  if (!guess) {
    console.log('indsde')
    message.textContent = 'Please enter a number, before you click on Check!'
  }
})
