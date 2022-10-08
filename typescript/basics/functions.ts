/***************************************************************************/
/********************************* Functions *******************************/
/***************************************************************************/

import { v4 as uuidv4 } from 'uuid'

function addNumbers(a: number, b: number): number {
  return a + b
}

export default addNumbers

export const addStrings = (str1: string, str2: string = ''): string => `${str1} ${str2}`

export const format = (title: string, param: string | number): string => `${title} ${param}`

export const printFormat = (title: string, param: string | number): void => {
  console.log(format(title, param))
}

export const fetchData = (url: string): Promise<string> => Promise.resolve(`Data from ${url}`)

export function introduce(salutation: string, ...names: string[]): string {
  return `${salutation} ${names.join(' ')}`
}

export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? 'first'} ${user?.last ?? 'last'}`
}

/***************************************************************************/
/************************* Functions with Functions ************************/
/***************************************************************************/

export function printToFile(text: string, callback: (text: string) => void): void {
  callback(text)
}

export function mutate(array: number[], mutateFunc: (v: number) => number) {
  return array.map(mutateFunc)
}

export function closureFunc(param1: string): (p: string) => void {
  return function (param2: string): string {
    return `This is a closure function passed ${param1} and ${param2} as arguments`
  }
}

export function naturalNumbersSum(n: number, sum: number = 0): number {
  if (n > 0) {
    sum += n
    return naturalNumbersSum(n - 1, sum)
  }
  return sum
}

/***************************************************************************/
/**************************** Function Overloading *************************/
/***************************************************************************/

interface Coordinate {
  x: number
  y: number
}

export function parseCoordinate(obj: Coordinate): Coordinate
export function parseCoordinate(obj: string): Coordinate
export function parseCoordinate(x: number, y: number): Coordinate

export function parseCoordinate(input: Coordinate | number | string, input2?: number): Coordinate {
  let coords: Coordinate = { x: 0, y: 0 }

  if (input instanceof Object) {
    coords = { ...input }
  } else if (typeof input === 'string') {
    input.split(',').forEach(str => {
      const [key, value] = str.split(':')
      coords[key as 'x' | 'y'] = parseInt(value, 10)
    })
  } else {
    coords = { x: input, y: input2 || 0 }
  }
  return coords
}

/***************************************************************************/
/***************************** Challenge 1 *********************************/
/***************************************************************************/

interface House {
  name: string
  planets: string | string[]
}

interface HouseWithID {
  id: string
  name: string
  planets: string | string[]
}

export function findHouses(houses: string): HouseWithID[]
export function findHouses(houses: string, filter: (house: House) => boolean): HouseWithID[]
export function findHouses(houses: House[]): HouseWithID[]
export function findHouses(houses: House[], filter: (house: House) => boolean): HouseWithID[]

export function findHouses(input: string | House[], filter?: (house: House) => boolean): HouseWithID[] {
  const houses = typeof input === 'string' ? JSON.parse(input) : input
  return (filter ? houses.filter(filter) : houses).map((house: House) => ({
    id: uuidv4(),
    ...house
  }))
}
