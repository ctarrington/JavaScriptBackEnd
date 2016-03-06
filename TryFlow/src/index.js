/* @flow  */

var samples = require('./samples.js');

console.log('hi');

function add(a/*:number*/ ,b/*:number*/ )
{
  return a+b;
}

add(1, 2);
add(1,'b');
add('a', 'b');

/**
 * Tests for one or more letters followed by one or more numbers.
 * @param  {string}  candidate specified string to be tested.
 * @return {Boolean}           true if candidate matches rule.
 */
function hasLetterAndNumber(candidate/*:string*/)
{
  var re = /[a-zA-Z]+[0-9]+/;
  return (re.test(candidate) );
}

hasLetterAndNumber('a1');
hasLetterAndNumber('11');
hasLetterAndNumber(1);

var foo = samples.foo();
hasLetterAndNumber(foo);

hasLetterAndNumber(40);

add('a');
