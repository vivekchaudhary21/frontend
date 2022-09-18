function range(from, to) {
  let r = Object.create(range.methods);
  r.from = from;
  r.to = to;
  return r;
}

range.methods = {
  includes(x) {
    return this.from <= x && x <= this.to;
  },

  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },

  toString() {
    return `(${this.from}...${this.to})`;
  },
};

let r1 = range(2, 5);
console.log(r1);
console.log(r1.includes(3));
console.log(r1.toString());
console.log([...r1]);
console.log('-----------------');

function RangeContructor(from, to) {
  this.from = from;
  this.to = to;
}

RangeContructor.prototype = {
  includes: function (x) {
    return this.from <= x && x <= this.to;
  },

  [Symbol.iterator]: function* () {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  },

  toString: function () {
    return `(${this.from}...${this.to})`;
  },
};

let r2 = new RangeContructor(2, 5);
console.log(r2);
console.log(r2.includes(3));
console.log(r2.toString());
console.log([...r2]);
console.log('-----------------');

class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  includes(x) {
    return this.from <= x && x <= this.to;
  }

  *[Symbol.iterator]() {
    for (let x = Math.ceil(this.from); x <= this.to; x++) {
      yield x;
    }
  }

  toString() {
    return `(${this.from}...${this.to})`;
  }
}

let r = new Range(2, 5);
console.log(r);
console.log(r.includes(3));
console.log(r.toString());
console.log([...r]);
console.log('-----------------');
