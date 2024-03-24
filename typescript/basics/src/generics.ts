/***************************************************************************/
/********************************** Generics *******************************/
/***************************************************************************/

console.log("******************* Generics *******************")

export function simpleState<T>(intialValue: T): [() => T, (v: T) => void] {
  let val: T = intialValue
  return [
    () => val,
    (v: T) => {
      val = v
    }
  ]
}

interface Rank<RankItem> {
  item: RankItem
  rank: number
}

export function ranker<RankItem>(items: RankItem[], rank: (v: RankItem) => number): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map(item => ({
    item,
    rank: rank(item)
  }))

  ranks.sort((a, b) => a.rank - b.rank)

  return ranks.map(rank => rank.item)
}

export interface Pokemon {
  name: string
  hp: number
}

export const pokemon: Pokemon[] = [
  {
    name: 'Bulbasaur',
    hp: 20
  },
  {
    name: 'Megasaur',
    hp: 5
  }
]

/***************************************************************************/
/***************************** Challenge 2 *********************************/
/***************************************************************************/

export function myForEach<T>(arr: T[], func: (val: T) => T): void {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = func(arr[i])
  }
}

export function myMap<T>(arr: T[], func: (val: T) => T): T[] {
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    newArr.push(func(arr[i]))
  }
  return newArr
}

/***************************************************************************/
/************************ Generics with keyof ******************************/
/***************************************************************************/

export function pluck<Datatype, KeyType extends keyof Datatype>(items: Datatype[], key: KeyType): Datatype[KeyType][] {
  return items.map(item => item[key])
}

export const dogs = [
  {
    name: 'mimi',
    age: 12
  },
  {
    name: 'kitti',
    age: 13
  }
]

export interface BaseEvent {
  time: number
  user: string
}

export interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string }
  checkout: BaseEvent
}

export function sendEvent<Name extends keyof EventMap>(name: Name, data: EventMap[Name]): void {
  console.log([name, data])
}


const [stateGetter, stateSetter] = simpleState(10)
stateGetter() // 10
stateSetter(20)
stateGetter() //20

const [stateGetter2, stateSetter2] = simpleState<string | null>(null)
stateGetter2() // null
stateSetter2('string')
stateGetter2() // string

ranker(pokemon, ({ hp }) => hp)
const arrOfNum = [1, 2, 3, 4]
myForEach(arrOfNum, val => val * 2) // [2,4,6,8]
const arrOfStr = ['a', 'b', 'c', 'd']
myForEach(arrOfStr, val => val.toUpperCase()) // ["A", "B", "C", "D"]
myMap(arrOfNum, val => val * 2) // [4,8,12,16]
pluck(dogs, 'name') // [ 'mimi', 'kitti' ]
pluck(dogs, 'age') // [12,13]
sendEvent('addToCart', { time: 1, user: 'A', quantity: 2, productID: 'B' }) // [ 'addToCart', { time: 1, user: 'A', quantity: 2, productID: 'B' } ]
sendEvent('checkout', { time: 1, user: 'A' }) // [ 'checkout', { time: 1, user: 'A' } ]


/*************************** more on generics ******************************/

// generic array

type Books = {
  name: string
  pages: number
}

const books: Array<Books> = []
books.push({name: 'Javascript Pro', pages: 213})

const reactBooks = new Array<Books>(5)

// generic funcitons

function logAndReturn<T>(thing: T): T {
  console.log("thing")
  return thing
}

logAndReturn("log this")
logAndReturn({val: 'log this'})

function filterVal<T>(arr:Array<T>, filter: string | number): Array<T> {
    return arr.filter(rec => rec !== filter)
  
}

const filterNums: Array<number> = filterVal<number>([1,2,3,4,5], 3)
console.log(filterNums)
const filterString: Array<string> = filterVal<string>(["a", "b", "c"], "c")
console.log(filterString)

// generic interfaces

interface Inventory<T> {
  pages: T,
  age: T
}

// classes

interface StorageItem {
  key: string
  value: string
}

class Storage<T extends StorageItem> {
  constructor(private items: Array<T>) {}

  add(item: T): void {
    this.items.push(item)
  }

  getValueAtIndex (index: number) {
    return this.items[index].value
  }

  getValueForKey(key: string): string  {
    return this.items.find(rec => rec.key === key)?.value ?? ''
  }
}

const storageItems: Array<StorageItem> = [{key: 'first', value: 'this is the the first value'}, {key: 'second', value: 'this is the the second value'}]

const s1 = new Storage<StorageItem>(storageItems)

console.log(s1.getValueAtIndex(1))
console.log(s1.getValueForKey("first"))