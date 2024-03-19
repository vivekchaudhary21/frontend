/***************************************************************************/
/*********************************** Interfaces ****************************/
/***************************************************************************/

// Duck typing
interface Duck {
  swim: () => void
  fly: () => void
  quack: () => void
}

export const bird = {
  swim: () => console.log('swim'),
  fly: () => console.log('fly'),
  quack: () => console.log('quack'),
  eat: () => console.log('eat'),
}

export function flyOverWater(duck: Duck) {
  console.log(duck.fly())
}

interface StringGenerator {
  (chars: string, nums: number): string
}

function CreateMovieID(name: string, id: number): string {
  return name + id
}

export let IDGenerator: StringGenerator
IDGenerator = CreateMovieID

interface One {
  one: String | number
}

interface Two {
  two: String | number
}

interface Three extends One, Two {
  three: string | number
}

const three: Three = {
  one: 1,
  two: 2,
  three: 3,
}
