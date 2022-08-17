/**
 * currently at stage 2 with tc39
 * A record is analogous to an Object in JavaScript with the exception that the Record is not an Object,
 * But a deeply immutable primitive value.
 * Likewise, a Tuple is like an Array but is a deeply immutable primitive value.
 */

// const log = console.log;

// const myRecord = #{ a: 1, b: 2 }; //Object
// const myTuple = #[1, 2, 3]; //Array
// // const r = #{a:1, b:2, #[1, 2, 3]};
// log(myRecord['b']); //myRecord.b

// // log(typeof #{prop:1} === "record"); //fails in playground
// // log(typeof #[1,2,3] === "tuple"); //fails in playground

// // log(myTuple === #[1, 2, 3])

// log(#[2, 4, 6, myRecord] === #[2, 4, 6, #{ a: 1, b: 2 }]);

// //Object.freeze() is shallow
// //JSON.parseImmutable() - returns Records and Tuples

// //Wrapper objects
// let s = 'Hello World'; //primitive
// log(s.length, s.toUpperCase());

// myTuple.pushed(77);
// //returns a new Tuple 1, 2, 3, 77

// //spread operator for editing~~~
// //create new thing from the old
// let rec = #{ a: 1, b: 2, c: 3 };
// let rec2 = #{ ...rec, b: 4, d: 77 };
// log(rec);
// log(rec2);

// const obj1 = {
//   b: 1,
//   c: 3,
//   d: #{
//       e:4
//   }
// }

// const rec1 = #{a: 1, ...obj1}
// log(rec1);
