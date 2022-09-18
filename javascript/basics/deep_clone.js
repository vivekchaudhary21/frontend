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

const obj = {
  a: 1,
  b: 2,
  c: [1, 2, 3, [4, 5, 6], 7, 8, 9],
  d: {
    a: 1,
    b: 2,
    c: [1, 24],
  },
};

const newArr = deepClone(arr);
const newObj = deepClone(obj);

newArr[0] = 4;
newArr[3].a = 4;
newArr[5] = new Date();
newArr[6][0] = '21212';
newArr[3].aa.aaa = 21;

console.log({ arr: arr[3].aa.aaa, newArr: newArr[3].aa.aaa });
console.log(newObj);
