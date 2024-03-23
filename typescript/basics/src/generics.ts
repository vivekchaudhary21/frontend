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

