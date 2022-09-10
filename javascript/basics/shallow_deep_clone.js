const arr = [
  1,
  2,
  3,
  {
    a: 1,
    aa: {
      aaa: 3,
    },
  },
  { b: 2 },
  new Date(),
  [3, 4, 5, 6],
];

// make shallow copy
// const newArr = [...arr, { c: 3 }];

// make shallow copy
// const newArr = Object.assign([], arr);

// make shallow freeze
// const newArr = Object.freeze(arr);

// make deep copy or use libraries like Lodash, Ramda etc
// const newArr = JSON.parse(JSON.stringify(arr)); // but has its limitatons

// vanilla  js deep clone

const deepClone = (obj) => {
  if (!(obj instanceof Object)) {
    return obj;
  }

  const newObject = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    const value = obj[key];
    newObject[key] = deepClone(value);
  }

  return newObject;
};

const newArr = deepClone(arr);

newArr[0] = 4;
newArr[3].a = 4;
newArr[5] = new Date();
newArr[6][0] = '21212';
newArr[3].aa.aaa = 21;

console.log({ arr: arr[3].aa.aaa, newArr: newArr[3].aa.aaa });
