"use strict";

const BluebirdPromise = require('bluebird');

function greet_old_school_cb(name, cb) {
    setTimeout(function() {
        cb(null, `hi, ${name},${Math.random()}`);
    }, 1000);
}

function greet_bluebird(name, greeting) {
    const promise = new BluebirdPromise(function(resolve, reject) {
        setTimeout(function() {
            resolve(`${greeting}, ${name},${Math.random()}`);
        }, 1000);
    });

    return promise;
}

function parseGreeting(raw) {
    const value = raw.split(',')[0];
    return value.trim();
}

function parseName(raw) {
    const value = raw.split(',')[1];
    return value.trim();
}

module.exports = {
    greet_old_school_cb,
    greet_bluebird,
    parseName,
    parseGreeting
};