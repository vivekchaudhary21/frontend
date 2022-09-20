'use strict';

function doSomething() {
  console.log(this); // in strict mode this will be undefined an in non strict mode this will be global
}

doSomething();

var obj = {
  name: 'vivek',
  getName: function () {
    console.log(this.name);
  },
};

var obj1 = {
  name: 'vivek',
  getName: () => {
    console.log(this.name);
  },
};

var obj2 = {
  name: 'vivek',
  getName: function () {
    return function () {
      console.log(this?.name);
    };
  },
};

var obj3 = {
  name: 'vivek',
  getName: function () {
    return () => {
      console.log(this.name);
    };
  },
};

obj.getName(); // vivek
obj1.getName(); // undefined
obj2.getName()(); // undefined
obj3.getName()(); // vivek

var getName = obj.getName;
var obj4 = { name: 'vihaan', getName };
obj4.getName(); // vihaan

var obj5 = { getName };
obj5.getName(); // undefined
