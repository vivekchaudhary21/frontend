const log = console.log

log(Number(null))
log(Number(undefined))

const triangle = {
  a: 3,
  b: 5,
  getArea(x = this.a, y = this.b) {
    return x * y
  },
}
log(triangle.getArea())
log(triangle.getArea(5, 6))

const triangle2 = {
  a: 31,
  b: 34,
}

log(triangle.getArea.apply(triangle2, [100, 100]))
log(triangle.getArea.call(triangle2, 200, 200))
const getAreabind = triangle.getArea.bind(triangle2, 300, 300)
log(getAreabind())

// function Triangle(a, b) {
//   this.a = a
//   this.b = b
// }

// Triangle.prototype.getArea = function () {
//   return this.a * this.b
// }

class Triangle {
  constructor(a, b) {
    this.a = a
    this.b = b
  }

  static sidesOfTriangle = 3

  static getSides() {
    return Triangle.sidesOfTriangle
  }

  getArea() {
    return this.a * this.b
  }
}

const t1 = new Triangle(2, 3)

log(t1.getArea())

const func = () => {}

log(func instanceof Function)
log(Array.isArray([]))

class ColorTraingle extends Triangle {
  constructor(a, b, color) {
    super(a, b)
    this.color = color
  }

  getAreaAndColor() {
    return `The area of this traingle is ${this.getArea()} and color is ${
      this.color
    }`
  }
}

class Mymath {
  maximum(...rest) {
    return Math.max(...rest)
  }
}

class Circle {
  #radius = 21

  get radius() {
    return this.#radius
  }
}

const c = new Circle()

console.log(c.radius)

const obj = {
  name: 'Vivek',
  sings() {
    console.log(`${this.name} sings a song.`)
  },
}

obj.sings()

const obj2 = obj.sings

obj2.call({ name: 'Vihaan ' })
obj2.call(obj)
