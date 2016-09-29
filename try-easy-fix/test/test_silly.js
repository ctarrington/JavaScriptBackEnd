"use strict";

const chai = require('chai');
const assert = chai.assert;
const easyFix = require('easy-fix');
const BluebirdPromise = require('bluebird');

const silly = require('../lib/silly');

function oldschool(obj, methodName) {
    const promiser = obj[methodName];

    obj[methodName] = function() {

        const cb = arguments[arguments.length-1];
        const promise = promiser(...arguments);
        promise.then(function(data) {
            cb(null, data);
        });
    }
}

function newSchool(obj, methodName) {
    const oldStyle = obj[methodName];
    obj[methodName] = function(name) {
        const oldArguments = arguments;
        const promise = new BluebirdPromise(function(resolve, reject) {
            oldStyle(...oldArguments, function(error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
        return promise;
    }
}



oldschool(silly, 'greet_bluebird');
easyFix.wrapAsyncMethod(silly, 'greet_bluebird', {});
newSchool(silly, 'greet_bluebird');


easyFix.wrapAsyncMethod(silly, 'greet_old_school_cb', {});


describe('silly greeting parser depending on an old school source of async greetings', function() {
    it('can parse a response', function(done) {
        silly.greet_old_school_cb('fred', function(error, response) {
            const name = silly.parseName(response);
            assert(name === 'fred', 'name should match');
            done();
        });
    });
});

describe('silly greeting parser depending on a bluebird promise using source of async greetings', function() {
    it('can parse a response', function(done) {
        const promise = silly.greet_bluebird('fred', 'Yo');
        promise.then(function(response) {
            const name = silly.parseName(response);
            const greeting = silly.parseGreeting(response);
            assert(name === 'fred', 'name should match');
            assert(greeting === 'Yo', 'greeting should match');
            done();
        });
    });
});