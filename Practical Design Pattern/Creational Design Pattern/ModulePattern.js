/**
 * Modules are an integral piece of any robust application’s architecture
 * and typically help in keeping the units of code for a project both cleanly separated and organized.
 *
 * In JavaScript, there are several options for implementing modules. These include:
 * Object literal notation
 * The Module pattern
 * AMD modules
 * CommonJS module
 * ECMAScript Harmony modules
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

var task1 = new TaskClass('Laundry');
var task2 = new TaskClass('Car wash');

/************************* The Module pattern ************************/

var repo = function () {
  const db = [];
  let id = 1;

  return {
    getFromDB: function (id) {
      return db.filter((data) => data.id === id);
    },
    saveInDB: function (value) {
      db.push({
        id: id++,
        ...value,
      });
    },
    getDB: function () {
      return db;
    },
  };
};

const db = repo();
db.saveInDB(task1);

const dbTask1 = db.getFromDB(1);
console.log(dbTask1);
