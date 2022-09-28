/*****************************************************************************/
/******************************** DATES AND TIMES ****************************/
/*****************************************************************************/

/**
 * The Date class is JavaScript’s API for working with dates and times.
 * Create a Date object with the Date() constructor.
 * With no arguments, it returns a Date object that represents the current date and time.
 */

let now = new Date(); // 2022-09-26T11:50:31.552Z

// If you pass one numeric argument, the Date() constructor interprets that argument
// as the number of milliseconds since the 1970 epoch:

let epoch = new Date(0); // 1970-01-01T00:00:00.000Z

// If you specify two or more integer arguments, they are interpreted as
// the year, month, day-of-month, hour, minute, second, and millisecond in your local time zone

let century = new Date(2100, 0, 1, 2, 3, 4, 5); // 2099-12-31T20:33:04.005Z

// One quirk of the Date API is that the first month of a year is number 0, but the first day of a month is number 1.
// If you omit the time fields, the Date() constructor defaults them all to 0, setting the time to midnight.

// If you want to specify a date and time in UTC (Universal Coordinated Time, aka GMT), then you can use the Date.UTC()

let century_UTC = new Date(Date.UTC(2100, 0, 1)); // 2100-01-01T00:00:00.000Z
let century_UTC_with_time = new Date(Date.UTC(2100, 0, 1, 3, 4, 5)); // 2100-01-01T03:04:05.000Z

// If you want to display a date in UTC, you should explicitly convert it to a string with toUTCString() or toISOString().

century.toISOString(); // 2099-12-31T20:33:04.005Z
century.toUTCString(); // Thu, 31 Dec 2099 20:33:04 GMT

/**
 * Once you have a Date object, various get and set methods allow you to
 * query and modify the year, month, day-of-month, hour, minute, second, and millisecond fields of the Date.
 *
 * To get or set the other fields of a Date, replace “FullYear” in the method name with
 * “Month”, “Date”, “Hours”, “Minutes”, “Seconds”, or “Milliseconds”.
 */

let d = new Date(); // Start with the current date: 2022-09-26T12:00:32.818Z
d.setFullYear(d.getFullYear() + 1); // Increment the year: 2023-09-26T12:00:54.019Z

/*****************************************************************************/
/********************************** TIMESTAMPS *******************************/
/*****************************************************************************/

/**
 * JavaScript represents dates internally as integers that specify the number of milliseconds
 * since (or before) midnight on January 1, 1970, UTC time.
 *
 * For any Date object, the getTime() method returns this internal value, and the set Time() method sets it.
 */

d = new Date();
d.getTime(); // 1664377899403
d.setTime(d.getTime() + 30000); // added 30 seconds => 166437808

/**
 * The static Date.now() method returns the current time as a timestamp
 */

let start_time = Date.now();
// reticulateSplines(); // Do some time-consuming operation
let end_time = Date.now();
let time_diff = end_time - start_time;

/**
 * The performance object is part of a larger Performance API that is not defined by the ECMAScript standard.
 * But it is implemented by web browsers and by Node. 
 * 
 * In order to use the performance object in Node, you must import it with:

 */

const { performance } = require('perf_hooks');

start_time = performance.now();
let i = 0;
while (i < 1000000) {
  i++;
}
end_time = performance.now();
time_diff = end_time - start_time; // almost 4 ms

/*****************************************************************************/
/******************************* DATE ARITHMATIC *****************************/

/**
 * Date objects can be compared with JavaScript’s standard <, <=, >, and >= comparison operators.
 * And you can subtract one Date object from another to determine the number of milliseconds between the two dates.
 * This works because the Date class defines a valueOf() method that returns a timestamp.
 *
 * To do date arithmetic involving days, months, and years, you can use setDate(), setMonth(), and setYear().
 */

d = new Date(); // 2022-09-28T15:40:21.343Z
console.log(d);
new Date(d.setMonth(d.getMonth() + 3, d.getDate() + 14)); //2023-01-11T15:40:21.343Z

/*****************************************************************************/
/****************** FORMATTING AND PARSING DATE STRINGS **********************/

d = new Date(2020, 0, 1, 17, 10, 30); // 2020-01-01T11:40:30.000Z
d.toString(); // => Wed Jan 01 2020 17:10:30 GMT+0530 (India Standard Time)
d.toUTCString(); // => Wed, 01 Jan 2020 11:40:30 GMT
d.toLocaleDateString(); // => 01/01/2020
d.toLocaleTimeString(); // => 17:10:30
d.toISOString(); // => 2020-01-01T11:40:30.000Z

/**
 * toString(): This method uses the local time zone but does not format the date and time in a locale-aware way.
 *
 * toUTCString(): This method uses the UTC time zone but does not format the date in a localeaware way.
 *
 * toISOString():
 * This method prints the date and time in the standard year-month-day
 * hours:minutes:seconds.ms format of the ISO-8601 standard.
 * The letter “T” separates the date portion of the output from the time portion of the output.
 * The timeis expressed in UTC, and this is indicated with the letter “Z” as the last letter of the output.
 *
 * toLocaleString(): This method uses the local time zone and a format that is appropriate for the user’s locale.
 *
 * toDateString():
 * This method formats only the date portion of the Date and omits the time.
 * It usesthe local time zone and does not do locale-appropriate formatting.
 *
 * toLocaleDateString(): This method formats only the date. It uses the local time zone and a localeappropriate date format.
 *
 * toTimeString():
 * This method formats only the time and omits the date.
 * It uses the local time zone but does not format the time in a locale-aware way.
 *
 * toLocaleTimeString(): This method formats the time in a locale-aware way and uses the local time zone.
 */
