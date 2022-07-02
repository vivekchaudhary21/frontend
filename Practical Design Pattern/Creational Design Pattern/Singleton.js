/**
 * The Singleton pattern is thus known because it restricts instantiation of a class to a single object.
 * Classically, the Singleton pattern can be implemented by creating a class with a method
 * that creates a new instance of the class if one doesn’t exist.
 */

var TaskRepo = (function () {
  var taskRepo;

  function createRepo() {
    taskRepo = new Object('Task1');
    return taskRepo;
  }

  return {
    getRepo() {
      if (!taskRepo) {
        return createRepo();
      }
      return taskRepo;
    },
  };
})();

var task1 = TaskRepo.getRepo();
var task2 = TaskRepo.getRepo();

console.log(task1, task2);

var Counter = (function () {
  var count = 0;

  function incrementCounter() {
    count++;
    console.log(count);
    return count;
  }

  return {
    incrementCounter,
  };
})();

var count1 = Counter;
var count2 = Counter;
