"use strict";

const silly = require('./lib/silly');

console.log('yo');
silly.greet('fred', function(error, response) {
    console.log('response = '+response);
});