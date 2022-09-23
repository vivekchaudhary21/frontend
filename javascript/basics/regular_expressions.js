/**
 * Regular Expressions
 * A regular expression is an object that describes a textual pattern.
 * The JavaScript RegExp class represents regular expressions,
 * and both String and RegExp define methods that use regular expressions
 * to perform powerful pattern-matching and search-and-replace functions on text
 */

// This pattern matches any string that ends with the letter "s"
let p1 = /s$/;
let p2 = new RegExp('s&');

// matches any string that contains java in it.
let p3 = /java/;

/**
 * Flags
 * Flags are specified following the second slash character in RegExp literals,
 * or as a second string argument to the RegExp() constructor
 */

// i flag is for case insensitive meaning match string that ends with s or S
let p4 = /s$/i;

/**
 * Punctuations Characters
 * If you want to include any of these punctuation characters literally in a regular expression,
 * you must precede them with a \.
 */
