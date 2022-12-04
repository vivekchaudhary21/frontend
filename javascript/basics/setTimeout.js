let some = 21

setTimeout(() => {
  console.log('some in tmeout', some)
}, 4000)

setTimeout(() => {
  console.log('some in tmeout', some)
}, 5000)

some = 22

console.log('some', some)
