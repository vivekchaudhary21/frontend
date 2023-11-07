const text: string = 'Hello'
console.log(text)

let arr: Array<number> = [1,23] 
let arr2: number[] = [1,2,34]

type Person = {
  name: string
  age: number
}

let obj: Person  = {name: 'vivek', age: 121}


function sum(...values: number[]) {
  const total =  values.reduce((acc, val) => acc + val)
  console.log(total)
}

sum(1,23)
sum(1,2,3,4,5)

type Add = (a:number, b?:number) => number

let add: Add;

add = function(x: number,y: number = 13): number {
  console.log({x,y})
    return x+y
}

console.log(add(2,3))
console.log(add(2))


// duck typing
type one = {
  a: number,
  b: number
}

type two = {
  a: number,
  b: number
  c: number
}

const obj2: two = {
  a: 21,
  b: 22,
  c: 21
}

function display(obj: one): void {
  console.log(obj.a, obj.b)
}

display(obj2)

class Animal {
  // protected name: string

  constructor(protected name: string) {
    // this.name = name
  }

  move () {
    console.log(`${this.name} flew away`)
  }
}

console.log(Animal.name)

class Bird extends Animal {
  move () {
    console.log(`${this.name} flew away high`)
  }
}

const bird = new Bird("cukoo")


bird.move()


class Queue<T> {
  data: T[] = []
  
  push(value: T) {
    this.data.push(value)
  }

  pop(): T | undefined{
    return this.data.shift()
  }
}

const q1 = new Queue<number>()
q1.push(21)
q1.push(23)
console.log(q1)



let anyVar: any=  "anyvar"
let unknownvar: unknown = "unknownvar"

// anyVar.anything.is.possible() // no compile time

if(typeof unknownvar === 'string')
unknownvar.trim

if(Array.isArray(unknownvar))
unknownvar.push(21)



let a: unknown

// const b =  (a as one).a;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const mainAsync  = async () => {
    await delay(1000)
    console.log(`1s`)
    await delay(1000)
    console.log(`2s`)
    await delay(1000)
    console.log(`3s`)
}
// mainAsync()

console.log("hello")
