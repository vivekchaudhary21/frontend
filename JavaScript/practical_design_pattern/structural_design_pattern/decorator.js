/**
 * Used to add new functionality to an existing object, without being obtrusive.
 */

function MacBook() {
  this.cost = function () {
    return 997;
  };
  this.screenSize = function () {
    return 11.6;
  };
}

// Decorator 1
function Memory(macbook) {
  var v = macbook.cost();

  macbook.cost = function () {
    return v + 75;
  };
}

// Decorator 2
function Engraving(macbook) {
  var v = macbook.cost();

  macbook.cost = function () {
    return v + 200;
  };
}

// Decorator 3
function Insurance(macbook) {
  var v = macbook.cost();

  macbook.cost = function () {
    return v + 250;
  };
}

var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);

/********************* Classes ******************/

class Shape {}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  toString() {
    return `The radius of a circle is ${this.radius}`;
  }
}

class ColoredShape extends Shape {
  constructor(shape, color) {
    super();
    this.shape = shape;
    this.color = color;
  }

  toString() {
    return `${this.shape.toString()} and color is ${this.color}`;
  }
}

var circle = new Circle(2);
var colorShape = new ColoredShape(circle, 'red');
