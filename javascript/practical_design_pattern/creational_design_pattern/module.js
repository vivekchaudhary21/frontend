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

/************************** Object literal ***************************/

/**
 * In object literal notation, an object is described as a set of comma-separated
 * name/value pairs enclosed in curly braces ({}).
 */

var myModule = {
  myProperty: 'someValue',
  myConfig: {
    useCaching: true,
    language: 'en',
  },
  myMethod: function (newConfig) {
    if (typeof newConfig === 'object') {
      this.config = newConfig;
      console.log(this.config.language);
    }
  },
};

myModule.myMethod({
  language: 'fr',
  useCaching: false,
});

/************************* The Module pattern ************************/

/**
 * The Module pattern was originally defined as a way to provide both private and public
 * encapsulation for classes in conventional software engineering.
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

var repo = function () {
  var db = [];
  var id = 1;

  var getFromDB = function (id) {
    return db.filter((data) => data.id === id);
  };

  var saveInDB = function (value) {
    db.push({
      id: id++,
      ...value,
    });
  };

  return {
    getFromDB,
    saveInDB,
  };
};

var db = repo();
db.saveInDB(task1);

var dbTask1 = db.getFromDB(1);
console.log(dbTask1);
