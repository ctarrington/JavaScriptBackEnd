"use strict";

const test = require('tape');
const easyFix = require('easy-fix');

const silly = require('../lib/silly');

easyFix.wrapAsyncMethod(silly, 'greet_old_school_cb', {});

test('greeting parser depending on old school source of async greetings', function(t) {
    t.plan(2);
    silly.greet_old_school_cb('fred', function(error, response) {
            const name = silly.parseName(response);
            const greeting = silly.parseGreeting(response);
            t.equal(name, 'fred', 'name should match');
            t.equal(greeting, 'hi');
        });
});