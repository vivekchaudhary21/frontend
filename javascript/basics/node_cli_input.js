const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readLine.question('Please enter a number: ', number => {
  const num = parseInt(number)
  try {
    if (!isNaN(num)) {
      console.log('U entered', num)
    } else {
      throw new Error('Please enter a valid number')
    }
  } catch (error) {
    console.log('Error thrown ', error.message)
  }

  readLine.close()
})
