const modules = {};

function require(moduleName) {
  return modules[moduleName];
}

modules['sets.js'] = (function () {
  const exports = {};

  exports.someValue = 21;

  return exports;
})();

modules['stats.js'] = (function () {
  const exports = {};

  exports.someFun1 = () => 'returned from a function fun1';
  exports.someFun2 = () => 'returned from a function fun2';

  return exports;
})();

const someValue = require('sets.js');
const someFun = require('stats.js');

console.log({
  someValue: someValue.someValue,
  fun1: someFun.someFun1(),
  fun2: someFun.someFun2(),
});
