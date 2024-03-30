// const log = console.log

// log(Number(null))
// log(Number(undefined))

// const triangle = {
//   a: 3,
//   b: 5,
//   getArea(x = this.a, y = this.b) {
//     return x * y
//   },
// }
// log(triangle.getArea())
// log(triangle.getArea(5, 6))

// const triangle2 = {
//   a: 31,
//   b: 34,
// }

// log(triangle.getArea.apply(triangle2, [100, 100]))
// log(triangle.getArea.call(triangle2, 200, 200))
// const getAreabind = triangle.getArea.bind(triangle2, 300, 300)
// log(getAreabind())

// // function Triangle(a, b) {
// //   this.a = a
// //   this.b = b
// // }

// // Triangle.prototype.getArea = function () {
// //   return this.a * this.b
// // }

// class Triangle {
//   constructor(a, b) {
//     this.a = a
//     this.b = b
//   }

//   static sidesOfTriangle = 3

//   static getSides() {
//     return Triangle.sidesOfTriangle
//   }

//   getArea() {
//     return this.a * this.b
//   }
// }

// const t1 = new Triangle(2, 3)

// log(t1.getArea())

// const func = () => {}

// log(func instanceof Function)
// log(Array.isArray([]))

// class ColorTraingle extends Triangle {
//   constructor(a, b, color) {
//     super(a, b)
//     this.color = color
//   }

//   getAreaAndColor() {
//     return `The area of this traingle is ${this.getArea()} and color is ${
//       this.color
//     }`
//   }
// }

// class Mymath {
//   maximum(...rest) {
//     return Math.max(...rest)
//   }
// }

// class Circle {
//   #radius = 21

//   get radius() {
//     return this.#radius
//   }
// }

// const c = new Circle()

// console.log(c.radius)

// const obj = {
//   name: 'Vivek',
//   sings() {
//     console.log(`${this.name} sings a song.`)
//   },
// }

// obj.sings()

// const obj2 = obj.sings

// obj2.call({ name: 'Vihaan ' })
// obj2.call(obj)

// const obj = { a: 1, b: 2 }
// const arr = [1, 2, 4]

// // for (const value in obj) {
// //   console.log(value)
// // }

// for (const value of arr) {
//   console.log(value)
// }

// const map = new Map()

// map.set('a', 1)
// map.set('b', 2)

// console.log(map)

// for (const [key, value] of map) {
//   console.log(key, value)
// }

// const set = new Set()

// set.add(1)
// set.add(1)
// set.add(2)
// console.log(set)

// for (const value of set) {
//   console.log(value)
// }

// const button = document.querySelector('.click')

// const conan = {
//   name: 'Conan',
//   talk() {
//     console.log(`${this.name} is talking`)
//   },
// }

// const talk = conan.talk.bind(conan)
// // const talk = () => conan.talk.call(conan)

// button.addEventListener('click', talk)

// class Counter {
//   constructor(startingNum, incrementAmount = 1) {
//     this.count = startingNum
//     this.inc = incrementAmount
//   }

//   // startPrintingCounter() {
//   //   const that = this
//   //   setInterval(function () {
//   //     console.log(that.count)
//   //     that.count += that.inc
//   //   }, 1000)
//   // }

//   // startPrintingCounter() {
//   //   setInterval(() => {
//   //     console.log(this.count)
//   //     this.count += this.inc
//   //   }, 1000)
//   // }

//   startPrintingCounter() {
//     setInterval(
//       function () {
//         console.log(this.count)
//         this.count += this.inc
//       }.bind(this),
//       1000
//     )
//   }
// }

// const c = new Counter(2, 2)
// // c.startPrintingCounter()

// class Timer {
//   constructor() {
//     this.tick = 0
//     this.timerId = null
//   }

//   start() {
//     this.timerId = setInterval(
//       function () {
//         this.tick += 1
//         console.log(this.tick)
//         if (this.tick === 5) {
//           clearInterval(this.timerId)
//         }
//       }.bind(this),
//       1000
//     )
//   }
// }

// const t = new Timer()
// t.start()

// Promises

// const promise1 = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve(21), 1000)
//   })

// const promise2 = (val) =>
//   new Promise((resolve) => {
//     setTimeout(() => resolve(21 + val), 1000)
//   })

// promise1()
//   .then((val) => {
//     promise2(val).then((data) => {
//       console.log('final val', data)
//     })
//   })
//   .catch((err) => console.log('err', err))

// promise1()
//   .then((val) => val)
//   .then((val) => promise2(val).then((data) => data))
//   .then((data) => console.log('final data', data))
//   .catch((err) => console.log('err', err))

// promise
//   .then((val) => {
//     console.log(val)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// async function somePromiseFunc() {
//   try {
//     const value = await promise1()
//     const data = await promise2(value)
//     console.log('async', data)
//   } catch (error) {
//     console.log('err', err)
//   }
// }

// somePromiseFunc()

// console.log('hello sir, fimme the value')

//pokemon api calls

const api = 'https://pokeapi.co./api/v2/pokemon'
// fetch(api + '/1')
//   .then((response) => response.json())
//   .then((data) => pokemon.push(data.name))
//   .then(() => fetch(api + '/2'))
//   .then((response) => response.json())
//   .then((data) => {
//     pokemon.push(data.name)
//     console.log(pokemon)
//   })
//   .catch((err) => console.log('Catching error', err))

// function pokemonNames() {
//   const pokemon = []
//   for (let i = 1; i <= 4; i++) {
//     fetch(`${api}/${i}`)
//       .then((response) => response.json())
//       .then((data) => {
//         pokemon.push(data.name)
//         return pokemon
//       })
//       .then((pokemon) => console.log(pokemon))
//       .catch((err) => console.log('Catching error', err))
//   }
// }
// pokemonNames()

// async function getPokemon() {
//   const pokemonAsync = []
//   for (let i = 1; i <= 4; i++) {
//     const res = await fetch(`${api}/${i}`)
//     const data = await res.json()
//     pokemonAsync.push(data.name)
//   }
//   console.log(pokemonAsync)
// }

// // getPokemon()

// const asyncIterator = (async function* () {
//   for (let i = 1; i <= 20; i++) {
//     const res = await fetch(`${api}/${i}`)
//     const data = await res.json()
//     yield data.name
//   }
// })()

// const asyncIteratorFunc = async () => {
//   const pokemon = []
//   for await (const value of asyncIterator) {
//     pokemon.push(value)
//   }
//   console.log(pokemon)
// }

// asyncIteratorFunc()

// const someIterator = (function* () {
//   for (let i = 0; i < 10; i++) {
//     yield i
//   }
// })()

// const useSomeIterator = () => {
//   for (const value of someIterator) {
//     if (value === 6) {
//       break
//     }
//     console.log(value)
//   }
// }

// useSomeIterator()

// function* numberIerator() {
//   yield 1
//   yield 2
// }

// const numItr = numberIerator()
// const numItr1 = numberIerator()

// console.log('cl', numItr.next().value)
// console.log('cl', numItr.next().value)

// for (const value of numItr1) {
//   console.log('hello111', value)
// }

// async function* pokemonIteratoer(total) {
//   for (let i = 1; i <= total; i++) {
//     const response = await fetch(`${api}/${i}`)
//     const pokemon = await response.json()
//     yield pokemon.name
//   }
// }

// async function getPokemons(pokemonIteraraor) {
//   const pokemons = []
//   for await (const pokemon of pokemonIteraraor) {
//     pokemons.push(pokemon)
//   }
//   console.log(pokemons)
// }

// const tenPokemon = pokemonIteratoer(10)
// getPokemons(tenPokemon)

// const getThreePokemonAsyncWay = async () => {
//   const api1 = await fetch('https://pokeapi.co./api/v2/pokemon/1')
//     .then((res) => res.json())
//     .then((data) => data)
//   const api2 = fetch('https://pokeapi.co./api/v2/pokemon/2')
//     .then((res) => res.json())
//     .then((data) => data)
//   const api3 = fetch('https://pokeapi.co./api/v2/pokemon/3')
//     .then((res) => res.json())
//     .then((data) => data)
//   const response = await Promise.all([api1, api2, api3])
//   console.log(response)
// }

// getThreePokemonAsyncWay()

// fetch('https://pokeapi.co./api/v2/pokemon/1')
//   .then((res) => res.json())
//   .then((data) => console.log('1', data))

// fetch('https://pokeapi.co./api/v2/pokemon/2')
//   .then((res) => res.json())
//   .then((data) => console.log('2', data))i

// fetch('https://pokeapi.co./api/v2/pokemon/3')
//   .then((res) => res.json())
//   .then((data) => console.log('3', data))

// const getPokemon1 = async () => fetch('https://pokeapi.co./api/v2/pokemon/1')

// const getPokemon2 = async () => fetch('https://pokeapi.co./api/v2/pokemon/2')

// const getPokemon3 = async () =>
//   await fetch('https://pokeapi.co./api/v2/pokemon/3')

// const getPokemons = async (data) => {
//   const pokemons = []
//   for (let pokemondata of data) {
//     const pokemon = await pokemondata.json()
//     pokemons.push(pokemon.name)
//   }
//   return pokemons
// }

// const getPokemonsAllSettled = async (data) => {
//   const pokemons = []
//   for (let pokemondata of data) {
//     if (pokemondata.status === 'fulfilled') {
//       const pokemon = await pokemondata.value.json()
//       pokemons.push(pokemon.name)
//     }
//   }
//   return pokemons
// }

// const getAllPokemon = async () => {
//   try {
//     const data = await Promise.all([
//       getPokemon1(),
//       getPokemon2(),
//       getPokemon3(),
//     ])
//     const pokemons = await getPokemons(data)
//     console.log('All', pokemons)
//   } catch (error) {
//     console.log(error.message)
//   }

//   try {
//     const data1 = await Promise.allSettled([
//       getPokemon1(),
//       getPokemon2(),
//       getPokemon3(),
//     ])
//     const pokemons = await getPokemonsAllSettled(data1)
//     console.log('All settled', pokemons)
//   } catch (error) {
//     console.log(error.message)
//   }

//   const data2 = await Promise.race([
//     getPokemon1(),
//     getPokemon2(),
//     getPokemon3(),
//   ])
//   console.log('Race', data2)
// }

// getAllPokemon()
// console.log('hello there ...')

// create your own promises

// const aPromise = (url) =>
//   new Promise((resolve, reject) => {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch((error) => reject(error))
//   })

// aPromise('https://pokeapi.co./api/v2/pokemon/1').then((data) =>
//   console.log(data)
// )

// function wait(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (typeof ms === 'number') {
//         resolve()
//       } else {
//         reject()
//       }
//     }, ms)
//   })
// }

// async function demo() {
//   console.log('hi')
//   console.log('after 3 seconds')
//   await wait(3000)
//   console.log('there')
// }

// demo()

// New features
// optional chaining

// function getPerson() {
//   const person = {
//     name: {
//       fname: 'Foo',
//     },
//     address: {
//       street: '123',
//       city: 'http',
//     },
//   }
//   return person
// }

// const person = getPerson()

// console.log(person.name.lname) // undefined
// // console.log(person.name.lname.name) // error
// console.log(person.name.lname?.name) // undefined

// numeric sepratoea

// const witoutSeparator = 100000000000000
// const withSeparator = 1_000_000

// console.log(withSeparator)

// at

// const array = [10, 20, 30, 40]
// console.log(array.at(3))

// const str =
//   'lorem ipsum dolor sit amet consectetur, adipisicing lorem elit. Dolor esse autem dolorum in obcaecati at non eveniet quis assumenda,'

// const newStr = str.replace(new RegExp('lorem', 'ig'), 'LOREM')
// console.log(newStr)

// const newStr1 = str.replaceAll('lorem', 'LOREM')
// console.log(newStr1)

// logical operator

let loggedInUser = { username: 'vivek' }
loggedInUser &&= { ...loggedInUser, color: 'black' }
console.log(loggedInUser)
