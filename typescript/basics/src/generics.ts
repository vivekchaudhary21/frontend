/***************************************************************************/
/********************************** Generics *******************************/
/***************************************************************************/

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
