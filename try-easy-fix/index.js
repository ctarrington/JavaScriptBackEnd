"use strict";

const silly = require('./lib/silly');

console.log('yo');
silly.greet_old_school_cb('fred', function(error, response) {
    console.log('response = '+response);
    console.log('name = '+silly.parseName(response));
});