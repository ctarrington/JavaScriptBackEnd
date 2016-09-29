"use strict";

function greet_old_school_cb(name, cb) {
    setTimeout(function() {
        cb(null, 'hi, '+name+','+Math.random());
    }, 1000);
}

function greet_bluebird(name) {

}

function parseName(raw) {
    const name = raw.split(',')[1];
    return name.trim();
}

module.exports = {
    greet_old_school_cb: greet_old_school_cb,
    parseName: parseName
};