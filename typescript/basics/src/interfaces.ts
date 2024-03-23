/***************************************************************************/
/*********************************** Interfaces ****************************/
/***************************************************************************/

console.log("*************** interfaces ****************")

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
  duck.fly()
}

flyOverWater(bird)

interface StringGenerator {
  (chars: string, nums: number): string
}

function CreateMovieID(name: string, id: number): string {
  return name + id
}

export let IDGenerator: StringGenerator
IDGenerator = CreateMovieID

console.log(IDGenerator('Batman', 213))

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

interface Music {
  sing: () => void
}

class RandomNumberClass {
  static Num_Value = 21
  constructor(private num: number) {
    this.num = num + RandomNumberClass.Num_Value
  }

  get value(): number {
    return this.num
  }

  set value(val: number) {
    this.num = val + RandomNumberClass.Num_Value
  }

  printNum(): void {
    console.log("This is a number " + this.num)
  }
}

const n1 = new RandomNumberClass(21)
console.log(n1.value)
// n1.num = 25  not allowed as num is private use access modifier to perform this operation
n1.value = 23
console.log(n1.value)


class PositiveNumber extends RandomNumberClass {
  constructor(num: number, public postive: boolean) {
    super (num);
  }
}

const p1 = new PositiveNumber(34, true)
p1.printNum() // 34+21=55

 // Abstract classes

 abstract class Video {
  public owner: string = ''
  abstract type(): void
  
 }

 class Documentary extends Video {
  type(): void {
    console.log('Audio/Visual : ' + this.owner)
  }
 }

 const vid = new Documentary ()
 vid.owner = "Sci fi pictures"
 vid.type() 