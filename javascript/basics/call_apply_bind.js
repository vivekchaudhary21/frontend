/*********  call() and apply() ********?

/**
 * It’s a predefined method in javascript.
 * This method invokes a method (function) by specifying the owner object.
 * Diff between call and apply is apply needs array of arguments
 */

function sayHello(lastName, greeting) {
  console.log(`Hello ${this.name} ${lastName}. ${greeting}`);
}

var obj = { name: 'Vihaan' };

sayHello.call(obj, 'Bhakra', 'How are you ?'); // Hello Vihaan Bhakra. How are you ?
sayHello.apply(obj, ['Bhakra', 'How are you ?']); // Hello Vihaan Bhakra. How are you ?

var person = {
  age: 23,
  getAge: function () {
    console.log(this.age);
  },
};
var person2 = { age: 54 };

person.getAge.call(person2); // 54

/**********  bind()  *********/

/**
 * This method returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter.
 */
