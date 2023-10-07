function greet(salutation) {
  return (name) => {
    console.log(`${salutation} ${name}`)
  }
}

const hello = greet('hello')
const howdy = greet('howdy')

hello('vivek')
howdy('vihaan')

const obj = Object.freeze({
  a: 21,
  b: 31,
  c: {
    d: 41,
    e: {
      f: 51,
    },
  },
})

obj.c.d = 31

console.log(obj.c.d)
