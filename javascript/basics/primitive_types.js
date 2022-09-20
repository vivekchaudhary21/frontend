/************************  Primitive types  ******************/

/* String - It represents a series of characters and is written with quotes. A string can be represented using a single or a double quote. */

var str = 'Vivek'; //using double quotes
var str2 = 'John Doe'; //using single quotes

/* Number - It represents a number and can be written with or without decimals. */

var x = 3; //without decimal
var y = 3.6; //with decimal

/*BigInt - This data type is used to store numbers which are above the limitation of the Number data type. It can store large integers and is represented by adding “n” to an integer literal. */

var bigInteger = 234567890123456789012345678901234567890;

/* Boolean - It represents a logical entity and can have only two values : true or false. Booleans are generally used for conditional testing. */

var a = 2;
var b = 3;
var c = 2;
(a == b)(
  // returns false
  a == c
); //returns true

/* Undefined - When a variable is declared but not assigned, it has the value of undefined and it’s type is also undefined. */

var x; // value of x is undefined
var y = undefined; // we can also set the value of a variable as undefined

/* Null - It represents a non-existent or a invalid value. */

var z = null;

/* Symbol - It is a new data type introduced in the ES6 version of javascript. It is used to store an anonymous and unique value. */

var symbol1 = Symbol('symbol');
var symbol2 = Symbol('symbol');

symbol1 === symbol2; // false

/* typeof of primitive types : */
typeof 'John Doe'; // Returns "string"
typeof 3.14; // Returns "number"
typeof true; // Returns "boolean"
typeof 234567890123456789012345678901234567890n; // Returns bigint
typeof undefined; // Returns "undefined"
typeof null; // Returns "object" (kind of a bug in JavaScript)
typeof Symbol('symbol'); // Returns Symbol
