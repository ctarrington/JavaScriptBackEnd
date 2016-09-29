"use strict";

const BluebirdPromise = require('bluebird');

function greet_old_school_cb(name, cb) {
    setTimeout(function() {
        cb(null, 'hi, '+name+','+Math.random());
    }, 1000);
}

function greet_bluebird(name) {
    const promise = new BluebirdPromise(function(resolve, reject) {
        setTimeout(function() {
            resolve('hi, '+name+','+Math.random());
        }, 1000);
    });

    return promise;
}

function parseName(raw) {
    const name = raw.split(',')[1];
    return name.trim();
}

module.exports = {
    greet_old_school_cb,
    greet_bluebird,
    parseName
};