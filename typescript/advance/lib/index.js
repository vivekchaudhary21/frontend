"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const text = 'Hello';
console.log(text);
let arr = [1, 23];
let arr2 = [1, 2, 34];
let obj = { name: 'vivek', age: 121 };
function sum(...values) {
    const total = values.reduce((acc, val) => acc + val);
    console.log(total);
}
sum(1, 23);
sum(1, 2, 3, 4, 5);
let add;
add = function (x, y = 13) {
    console.log({ x, y });
    return x + y;
};
console.log(add(2, 3));
console.log(add(2));
const obj2 = {
    a: 21,
    b: 22,
    c: 21
};
function display(obj) {
    console.log(obj.a, obj.b);
}
display(obj2);
class Animal {
    constructor(name) {
        this.name = name;
    }
    move() {
        console.log(`${this.name} flew away`);
    }
}
console.log(Animal.name);
class Bird extends Animal {
    move() {
        console.log(`${this.name} flew away high`);
    }
}
const bird = new Bird("cukoo");
bird.move();
class Queue {
    constructor() {
        this.data = [];
    }
    push(value) {
        this.data.push(value);
    }
    pop() {
        return this.data.shift();
    }
}
const q1 = new Queue();
q1.push(21);
q1.push(23);
console.log(q1);
let anyVar = "anyvar";
let unknownvar = "unknownvar";
// anyVar.anything.is.possible() // no compile time
if (typeof unknownvar === 'string')
    unknownvar.trim;
if (Array.isArray(unknownvar))
    unknownvar.push(21);
let a;
// const b =  (a as one).a;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const mainAsync = () => __awaiter(void 0, void 0, void 0, function* () {
    yield delay(1000);
    console.log(`1s`);
    yield delay(1000);
    console.log(`2s`);
    yield delay(1000);
    console.log(`3s`);
});
mainAsync();
