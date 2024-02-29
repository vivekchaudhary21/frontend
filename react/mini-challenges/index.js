let value = ''

function outer() {
  return function inner() {
    console.log('inner', value)
  }
}

const inner = outer()

value = 21
inner()

setTimeout(() => {
  value = 2334
  console.log('in set ', value)
}, 1000)

value = 31

function some(value) {
  value = 41
  console.log('some', value)
}

some(value)

console.log(value)

const greet = (greeting) => (message) => (name) =>
  `${greeting}, ${name}. ${message}`

// const morningGreetingMessgae = greet('Good Morning')('Have a great day ahead.')
// const nightGreetingMessgae = greet('Good Night')('Sleep tight.')

console.log(greet('Good Morning')('Have a great day ahead.')('tim'))
console.log(greet('Good Night')('Sleep tight.')('tim'))
