import * as basicTypes from './basic-types'
import * as functionTypes from './functions'
import * as tuplesTypes from './tuples'
import houses from './houses.json'

basicTypes.myRETest // /foo/
functionTypes.getName({ first: 'Foo', last: 'Bar' }) // Foo Bar
functionTypes.printToFile('great', console.log) //great
functionTypes.mutate([1, 2, 3], v => v * 10) // [10,20,30]
const outer = functionTypes.closureFunc('first')
outer('second') // This is a closure function passed first second as arguments

functionTypes.findHouses(JSON.stringify(houses))
functionTypes.findHouses(JSON.stringify(houses), ({ name }) => name === 'Atreides')
functionTypes.findHouses(houses)
functionTypes.findHouses(houses, ({ name }) => name === 'Harkonnen')
functionTypes.naturalNumbersSum(5)
functionTypes.parseCoordinate({ x: 2, y: 2 })
functionTypes.parseCoordinate(3, 2)
functionTypes.parseCoordinate('x:12,y:22')
tuplesTypes.add3dCoordinate([1, 2, 3], [1, 2, 3])
const [stringGetter, stringSetter] = tuplesTypes.strindState('first')
stringGetter() // first
stringSetter('second')
stringGetter() // second
