"use strict";

var chai = require('chai');
var assert = chai.assert;
var easyFix = require('easy-fix');

var silly = require('../lib/silly');

easyFix.wrapAsyncMethod(silly, 'greet_old_school_cb', {});

describe('silly greeting parser', function() {
    it('can parse a response', function(done) {
        silly.greet_old_school_cb('fred', function(error, response) {
            const name = silly.parseName(response);
            assert(name === 'fred', 'name should match');
            done();
        });
    });
});