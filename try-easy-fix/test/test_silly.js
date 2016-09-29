"use strict";

var chai = require('chai');
var assert = chai.assert;

var silly = require('../lib/silly');

describe('silly greeting', function() {
    it('can respond', function(done) {
        silly.greet('fred', function(error, response) {
            assert(response.includes('hi'), 'includes hi');
            done();
        });
    });
});