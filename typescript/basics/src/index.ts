import * as basicTypes from './basic-types'
import * as functionTypes from './functions'
import * as tuplesTypes from './tuples'
import * as generics from './generics'
import houses from './houses.json'

// basicTypes.myRETest // /foo/

// // Function
// const name1 = functionTypes.getName({ first: 'Foo', last: 'Bar' }) // Foo Bar
// console.log(name1)
// const name2 = functionTypes.getName({  }) // first last
// console.log(name2)
// functionTypes.printToFile('great', console.log) //great
// functionTypes.mutate([1, 2, 3], v => v * 10) // [10,20,30]
// const outer = functionTypes.closureFunc('first')
// const second = outer('second') // This is a closure function passed first second as arguments
// console.log(second)
// console.log(functionTypes.findHouses(JSON.stringify(houses)))
// console.log(functionTypes.findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides'))
// console.log(functionTypes.findHouses(houses))
// console.log(functionTypes.findHouses(houses, ({ name }) => name === 'Harkonnen'))
// functionTypes.naturalNumbersSum(5)
// functionTypes.parseCoordinate({ x: 2, y: 2 })
// functionTypes.parseCoordinate(3, 2)
// functionTypes.parseCoordinate('x:12,y:22')
// tuplesTypes.add3dCoordinate([1, 2, 3], [1, 2, 3])

// // Tuples
// const [stringGetter, stringSetter] = tuplesTypes.simpleStringState('first')
// stringGetter() // first
// stringSetter('second')
// stringGetter() // second

// // Generics
// const [stateGetter, stateSetter] = generics.simpleState(10)
// stateGetter() // 10
// stateSetter(20)
// stateGetter() //20

// const [stateGetter2, stateSetter2] = generics.simpleState<string | null>(null)
// stateGetter2() // null
// stateSetter2('string')
// stateGetter2() // string

// generics.ranker(generics.pokemon, ({ hp }) => hp)
// const arrOfNum = [1, 2, 3, 4]
// generics.myForEach(arrOfNum, val => val * 2) // [2,4,6,8]
// const arrOfStr = ['a', 'b', 'c', 'd']
// generics.myForEach(arrOfStr, val => val.toUpperCase()) // ["A", "B", "C", "D"]
// generics.myMap(arrOfNum, val => val * 2) // [4,8,12,16]
// generics.pluck(generics.dogs, 'name') // [ 'mimi', 'kitti' ]
// generics.pluck(generics.dogs, 'age') // [12,13]
// generics.sendEvent('addToCart', { time: 1, user: 'A', quantity: 2, productID: 'B' }) // [ 'addToCart', { time: 1, user: 'A', quantity: 2, productID: 'B' } ]
// generics.sendEvent('checkout', { time: 1, user: 'A' }) // [ 'checkout', { time: 1, user: 'A' } ]

 
