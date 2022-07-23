/**
 * Currying vs Partial Application
 * Closures
 *   A function which returns a function that
 *   can has access to the returned function's scope.
 *   function example(param){
 *     let a = 123;
 *     return function(otherParam){
 *       //both param and otherParam and a are available here
 *     }
 *   }
 *
 * Partial Application
 *   Uses closures.
 *   Returned function is partially applied to a new value,
 *   meaning that the value passed to the original function
 *   is already attached to the returned `partially applied` function
 *
 * Currying
 *   The process of taking a multiple argument function and
 *   breaking it up into a series of single argument partially
 *   applied functions.
 */

const log = console.log;

//Simple demo - the things we would want to curry
function bakeChocolateCupcakeWithVanilla(cakeType, cakeFlavor, icingType) {
  return `Made a ${cakeFlavour} ${cakeType} with ${icingType} icing.`;
}
function bakeVanillaCakeWithLemon(cakeType, cakeFlavor, icingType) {
  return `Made a ${cakeFlavour} ${cakeType} with ${icingType} icing.`;
}
//curry it
function bake(cakeType) {
  //partially applied
  return function (cakeFlavour) {
    //partially applied
    return function (icingType) {
      return `Made a ${cakeFlavour} ${cakeType} with ${icingType} icing.`;
    };
  };
}
let bakeCake = bake('cake');
let bakeCupcake = bake('cupcake');
let bakeMuffin = bake('muffin');

let chocCake = bakeCake('chocolate');
let vanillaCake = bakeCake('vanilla');
let chocCupcake = bakeCupcake('chocolate');
let carrotMuffin = bakeMuffin('carrot');

let chocoCakeWithStrawberry = chocCake('strawberry');
let chocoCakeWithVanilla = vanillaCake('vanilla');
let chocoCakeWithChocolate = chocCupcake('chocolate');
let chocoCakeWithOrange = carrotMuffin('orange');

// or you can chain

bake('cake')('chocolate')('vanilla');
bake('cupcake')('chocolate')('cherry');
bake('muffin')('carrot')('vanilla');

/******** More realistic example *********/
import fetch from 'node-fetch';

/**
 * Possible resources are posts, comments, albums, photos, todos, and users
 * @param {string} endpoint which resource to get from http://jsonplaceholder.typicode.com/
 * @returns {function} partially applied function
 */

async function jsonPlaceholder(endpoint) {
  let url = `http://jsonplaceholder.typicode.com/${endpoint}`;
  let resp = await fetch(url);
  let data = await resp.json();
  return (num) =>
    data
      .slice(0, num)
      .map((item) => {
        let label = item.name || item.title;
        return `<p>${endpoint} :: ${label}</p>`;
      })
      .join('\n');
}

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function init() {
  const posts = await jsonPlaceholder('posts');
  const users = await jsonPlaceholder('users');

  sleep(3000).then(() => {
    //after 3 seconds this runs
    log(posts(2));
    log(users(4));
  });
}

init();
