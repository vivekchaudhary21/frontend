'use strict';

/***********  Logical operators  ************/

/**
 * Logical operators in javascript, unlike operators in other programming languages, do not return true or false. They always return one of the operands.
 * OR ( | | ) operator - If the first value is truthy, then the first value is returned. Otherwise, always the second value gets returned.
 * AND ( && ) operator - If both the values are truthy, always the second value is returned. If the first value is falsy then the first value is returned or if the second value is falsy then the second value is returned.
 */

console.log('hey' && 'hi'); // "hi"
console.log('hey' || 'hi'); // "hey"

console.log(undefined && 'hi'); // undefined
console.log('hi' && undefined); // undefined

console.log(undefined || 'hi'); // "hi"
console.log('hi' || undefined); // "hi"

console.log(false && false); // "false"
console.log(false || false); // "false"
