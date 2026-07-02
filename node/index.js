// for (let i = 0; i < 10; i++) {
//   console.log('before', i)

//   if (i == 5) {
//     continue
//   }

//   console.log('after', i)
// }

// // let x = 3

// function z() {
//   console.log(x)
//   let y = x * 3
//   console.log(x)
// }

// z()

// const x = {
//   a: 1,
// }

// const y = x.a

// x.a = 21

// console.log(y)

const arr = [{ x: 1 }, { y: 2 }]

const z = arr[0]

z.x = 2

console.log(arr)
