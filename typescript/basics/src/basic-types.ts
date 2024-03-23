console.log("******************************* basic type ************************")


export const myValue: string = 'foo';
export let myVariable: number = 1;
myVariable += 1;

export let myBoolean: boolean = true;

export let myRETest: RegExp = /foo/;

export let myValues: number[] = [1, 2, 3];
export let myValues2: Array<string> = ['a'];

export interface Person {
  first: string;
  last: string;
  age?: number;
}

export const myPerson: Person = {
  first: 'jack',
  last: 'herrington',
};

export const data: Record<number, string> = {
  10: 'megan',
  20: 'lori',
};

data[5] = 'joe';

myValues.forEach((a) => console.log(a * 2))
export const multipliedValues = myValues.map((a) => a * 10);
