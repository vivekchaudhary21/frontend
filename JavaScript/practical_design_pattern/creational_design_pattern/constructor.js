/**
 * A constructor is a special method used to initialize a newly created object
 * once memory has been allocated for it.
 */

function Task(name) {
  this.name = name;
  this.completed = false;
}

Task.prototype.toString = function () {
  console.log(`Task name: ${this.name} `);
};

Task.prototype.complete = function () {
  console.log(`completeing ${this.name}`);
  this.completed = true;
};

var task1 = new Task('Laundry');
var task2 = new Task('Car wash');

task1.complete();
console.log({
  task1,
  task2,
});

/************************* Classes ************************/

/**
 * Classes are just syntantic sugar for writing constructor pattern
 * Underhood does the same thing
 */

class TaskClass {
  constructor(name) {
    this.name = name;
    this.completed = false;
  }

  complete() {
    console.log(`completeing ${this.name}`);
    this.completed = true;
  }

  toString() {
    console.log(`Task name: ${this.name} `);
  }
}

var taskClass1 = new TaskClass('Laundry');
var taskClass2 = new TaskClass('Car wash');

taskClass1.complete();
console.log({
  taskClass1,
  taskClass2,
});
