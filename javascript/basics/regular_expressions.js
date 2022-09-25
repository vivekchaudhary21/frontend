/*****************************************************************************/
/**************************** REGULAR EXPRESSIONS ****************************/
/*****************************************************************************/

/**
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

/**
 * Character Class
 * Individual literal characters can be combined into character classes by placing them within square brackets.
 * A character class matches any one character that is contained within it.
 * Thus, the regular expression /[abc]/ matches any one of the letters a, b, or c.
 *
 * Negated character
 * These match any character except those contained within the brackets.
 * A negated character class is specified by placing a caret (^) as the first character inside the left bracket.
 * The RegExp /[^abc]/ matches any one character other than a, b, or c.
 *
 * Range of characters
 * Character classes can use a hyphen to indicate a range of characters.
 * To match any one lowercase character from the Latin alphabet, use /[a-z]/,
 * and to match any letter or digit from the Latin alphabet, use /[a-zA-Z0-9]/.
 * And if you want to include an actual hyphen in your character class, simply make it the last character before the right bracket.
 *
 * [...] Any one character between the brackets.
 * [^...] Any one character not between the brackets.
 * . Any character except newline or another Unicode line terminator. Or, if the RegExp uses the s flag, then a period matches any character, including line terminators.
 * \w Any ASCII word character. Equivalent to [a-zA-Z0-9_].
 * \W Any character that is not an ASCII word character. Equivalent to [^a-zA-Z0-9_].
 * \s Any Unicode whitespace character.
 * \S Any character that is not Unicode whitespace.
 * \d Any ASCII digit. Equivalent to [0-9].
 * \D Any character other than an ASCII digit. Equivalent to [^0-9].
 * [\b] A literal backspace (special case).
 */

/**
 * Repition
 * {n,m} Match the previous item at least n times but no more than m times.
 * {n,} Match the previous item n or more times.
 * {n} Match exactly n occurrences of the previous item.
 * ? Match zero or one occurrences of the previous item. That is, the previous item is optional. Equivalent to {0,1}.
 * + Match one or more occurrences of the previous item. Equivalent to {1,}.
 * * Match zero or more occurrences of the previous item. Equivalent to {0,}.
 */

let r = /\d{2,4}/; // Match between two and four digits
r = /\w{3}\d?/; // Match exactly three word characters and an optional digit
r = /\s+java\s+/; // Match "java" with one or more spaces before and after
r = /[^(]*/; // Match zero or more characters that are not open parens

/**
 * Alternation, grouping, and references
 * The | character separates alternatives.
 * For example, /ab|cd|ef/ matches the string “ab” or the string “cd” or the string “ef ”
 * /\d{3}|[a-z]{4}/ matches either three digits or four lowercase letters.
 * Note that alternatives are considered left to right until a match is found.
 * If the left alternative matches, the right alternative is ignored, even if it would have produced a “better” match.
 * Thus, when the pattern /a|ab/ is applied to the string “ab”, it matches only the first letter.
 *
 * Parentheses have several purposes in regular expressions.
 * One purpose is to group separate items into a single subexpression so that the items can be treated as a single unit by |, *, +, ?, and so on.
 * For example, /java(script)?/ matches “java” followed by the optional “script”.
 * And /(ab|cd)+|ef/ matches either the string “ef ” or one or more repetitions of either of the strings “ab” or “cd”.
 */

/*****************************************************************************/
/********************************** FLAGS ************************************/
/*****************************************************************************/

/**
 * Every regular expression can have one or more flags associated with it to alter its matching behavior.
 * JavaScript defines six possible flags, each of which is represented by a single letter.
 * Flags are specified after the second / character of a regular expression literal or,
 * as a string passed as the second argument to the RegExp() constructor.
 *
 * g:
 * The g flag indicates that the regular expression is “global”—that is, that we intend
 * to use it to find all matches within a string rather than just finding the first match.
 *
 * i:
 * The i flag specifies that pattern matching should be case-insensitive.
 *
 * m:
 * The m flag specifies that matching should be done in “multiline” mode.
 *
 * s:
 * Like the m flag, the s flag is also useful when working with text that includes newlines.
 *
 * u:
 * The u flag stands for Unicode, and it makes the regular expression match full Unicode codepoints rather than matching 16-bit values.
 *
 * y:
 * The y flag indicates that the regular expression is “sticky”,
 * and should match at the beginning of a string or at the first character following the previous match.
 */

/*****************************************************************************/
/******************** STRING METHODS FOR PATTERN MATCHING ********************/
/*****************************************************************************/
// Strings support four methods that use regular expressions.

/*
 * search():
 * This method takes a regular expression argument,
 * returns either the character position of the start of the first matching substring
 * or −1 if there is no match:
 * If the argument to search() is not a regular expression,
 * it is first converted to one by passing it to the RegExp constructor.
 * search() does not support global searches; it ignores the g flag of its regular expression argument.
 */

'JavaScript'.search(/script/iu); // => 4
'Python'.search(/script/iu); // => -1

/**
 * replace():
 * The replace() method performs a search-and-replace operation.
 * It takes a regular expression as its first argument and a replacement string as its second argument.
 * It searches the string on which it is called for matches with the specified pattern.
 *
 * If the regular expression has the g flag set,
 * the replace() method replaces all matches in the string with the replacement string; \
 * otherwise, it replaces only the first match it finds.
 */

const text = 'javascript is amazing and fun to learn.';

// No matter how it is capitalized, replace it with the correct capitalization
const newText = text.replace(/javascript/gi, 'JavaScript'); // JavaScript is amazing and fun to learn.

/**
 * match():
 * The match() method is the most general of the String regular expression methods.
 * It takes a regular expression as its only argument (or converts its argument to a regular expression by passing it to the RegExp() constructor)
 *  and returns an array that contains the results of the match, or null if no match is found.
 * If the regular expression has the g flag set, the method returns an array of all matches that appear in the string.
 */

'7 plus 8 equals 15'.match(/\d+/g); // => ["7", "8", "15"]

/**
 * matchAll():
 * The matchAll() method is defined in ES2020, and as of early 2020 is implemented by modern web browsers and Node.
 * It expects a RegExp with the g flag set.
 * Instead of returning an array of matching substrings like match() does,
 * it returns an iterator that yields the kind of match objects that match() returns when used with a non-global RegExp.
 */

// One or more Unicode alphabetic characters between word boundaries
const words = /\b\p{Alphabetic}+\b/gu; // \p is not supported in Firefox yet
const someText = 'This is a naïve test of the matchAll() method.';
for (let word of someText.matchAll(words)) {
  console.log(`Found '${word[0]}' at index ${word.index}.`);
}

/**
 * split():
 * The last of the regular expression methods of the String object is split().
 * This method breaks the string on which it is called into an array of substrings,
 * using the argument as a separator. It can be used with a string argument like this:
 */

'123,456,789'.split(','); // => ["123", "456", "789"]

/*****************************************************************************/
/***************************** THE REGEXP CLASS ******************************/
/*****************************************************************************/
