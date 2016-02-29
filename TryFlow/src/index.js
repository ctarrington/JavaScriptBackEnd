/* @flow  */

var s = require('./samples.js');

console.log('hi');

function add(a/*:number*/ ,b/*:number*/ )
{
  return a+b;
}

add(1, 2);
add(1,'b');

/**
 * Tests for one or more letters followed by one or more numbers.
 * @param  {string}  candidate specified string to be tested.
 * @return {Boolean}           true if candidate matches rule.
 */
function hasLetterAndNumber(candidate)
{
  var re = /[a-zA-Z]+[0-9]+/;
  return (re.test(candidate) );
}

hasLetterAndNumber('a1');
hasLetterAndNumber('11');
hasLetterAndNumber(1);

var foo = (Math.random() > 0.5) ? 'hi1' : undefined;
hasLetterAndNumber(foo);

hasLetterAndNumber(40);

add('a');
