// example 1

const people = [
  { id: '1', name: 'ABC', age: 111 },
  { id: '2', name: 'DEF', age: 12 },
  { id: '3', name: 'GHI', age: 13 },
];

let result;

// count
result = people.reduce((acc, person) => acc + 1, 0);

// sum ages
result = people.reduce((acc, person) => acc + person.age, 0);

// array of names
result = people.reduce((acc, person) => [...acc, person.name], []);

// id => person lookup(dict)
result = people.reduce((acc, person) => ({ ...acc, [person.id]: person }), {});

// max age
result = people.reduce((acc, person) => Math.max(acc, person.age), 0);

// find by name
result = people.reduce((acc, person) => {
  if (acc !== null) return acc;
  if (person.name === 'ABC') {
    return person;
  }
  return null;
}, null);

// print
console.log(result);
