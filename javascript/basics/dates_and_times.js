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

let centuryUTC = new Date(Date.UTC(2100, 0, 1)); // 2100-01-01T00:00:00.000Z
let centuryUTCWithTime = new Date(Date.UTC(2100, 0, 1, 3, 4, 5)); // 2100-01-01T03:04:05.000Z

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
