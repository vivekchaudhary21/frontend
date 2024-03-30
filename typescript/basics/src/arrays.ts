console.log('******************* arrays ********************')

// Creating an array

export const arr1 = []
const arr2: number[] = []
const arr3: Array<Array<number>> = []
const arr4: Array<{}> = []
const arr5: Array<number> = Array()

// Adding and removing an element

const addRemove: number[] = [1, 2, 3, 4, 5]
addRemove.push(6, 7)
addRemove.push(8)
addRemove.unshift(-1, 0)
addRemove.unshift(-2)

// console.log("after adding", addRemove)

const removedBypop: number | undefined = addRemove.pop()
const removedByshift: number | undefined = addRemove.shift()
addRemove.push(10)
// console.log("after removing" , addRemove, {removedBypop, removedByshift})

// adding and removing an element in between of an array

addRemove.splice(9, 0, 8, 9)
// console.log(addRemove)

// joining two array
const arrOne: number[] = [1, 2, 3, 4]
const arrTwo: number[] = [10, 20, 30, 40]
const arrThree: number[] = [100, 200, 300, 400]

const joinedArray1: number[] = arrOne.concat(arrTwo)
const joinedArray2: number[] = arrOne.concat(arrTwo, arrThree)
const joinedArray3: number[] = [...arrOne, ...arrTwo, ...arrThree]
const createArrayFromArray1: number[] = Array.from(joinedArray1)
const createArrayFromArray2: number[] = [...joinedArray1]
const createArrayFromArray3: number[] = joinedArray2.slice()

// console.group({joinedArray1, joinedArray2, joinedArray3})
// console.group({createArrayFromArray1, createArrayFromArray2, createArrayFromArray3})

// copy an array - concat, slice and spead operator return new array but it only does a shollow copy not deep copy

interface OriginalArray {
  a: number
  b: number
  c: {
    d: number
  }
}

const originalArray: OriginalArray[] = [
  { a: 1, b: 2, c: { d: 5 } },
  { a: 3, b: 4, c: { d: 4 } },
]
const copiedArray = [{ ...originalArray[0] }, { ...originalArray[1] }]

originalArray[0].a = 21 // only changes in original array
originalArray[0].c.d = 32 // it will change the d in copied array too
// console.log({ originalArray, copiedArray })
// console.log(originalArray[0].c, copiedArray[0].c)

// sort an array

const names: string[] = ['foo', 'bar', 'baz']
names.sort()
// console.log(names)

// find an element in an array

const largeArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

const find10 = largeArray.find((num) => num === 10)
const find10Index = largeArray.indexOf(10)
const IsTenIncluded = largeArray.includes(10)
// console.log({ find10, find10Index, IsTenIncluded  })

/******************************* Tuples ***********************************/

const arrrayTuple: readonly [number, string] = [42, 'foo']

// arrrayTuple[3] = "21" error
// arrrayTuple.push(21) works, but if you dont want it to work make tuple readonly
// arrrayTuple.push(false) error

/******************************* Sets ***********************************/
const set = new Set<string>(['a', 'v', 'a'])
set.add('a')
set.add('b')
for (const val of set) {
  // console.log(val)
}
set.has('a')
set.delete('a')
set.size
set.clear()
// console.log(set)

/******************************* Maps ***********************************/
// key value pairs

const map = new Map<string, number>([
  ['a', 1],
  ['b', 2],
])
map.set('c', 3)
map.get('a')

for (const key of map.keys()) {
  // console.log(key)
}
for (const value of map.values()) {
  // console.log(value)
}
for (const [key, value] of map.entries()) {
  // console.log([key, value])
}

for (const [key, value] of map) {
  // console.log([key, value])
}

const mapVal = Object.fromEntries(map)
for (const val in mapVal) {
  // console.log(val, mapVal[val])
}
