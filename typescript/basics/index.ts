const log = console.log;

const myValue: string = 'foo';
let myVariable: number = 1;
myVariable += 1;

let myBoolean: boolean = true;

let myRETest: RegExp = /foo/;

log('myVariable', myVariable);

let myValues: number[] = [1, 2, 3];
let myValues2: Array<string> = ['a'];

interface Person {
  first: string;
  last: string;
  age?: number;
}

const myPerson: Person = {
  first: 'jack',
  last: 'herrington',
};

const data: Record<number, string> = {
  10: 'megan',
  20: 'lori',
};

data[5] = 'joe';

for (let i = 0; i < 10; i++) {
  log('Loop ', i);
}

myValues.forEach((a) => log(a));
const multipliedValues = myValues.map((a) => a * 10);
