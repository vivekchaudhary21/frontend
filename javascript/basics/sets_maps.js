let s = new Set([1, 2, 3]);

s.add(1);
s.add(2);
s.add([1, 2, 3]);
s.delete(2);
console.log(s.has([1, 2, 3]));
console.log(s.has(1));
console.log(s);

const arr = [...s];

console.log({ arr });
