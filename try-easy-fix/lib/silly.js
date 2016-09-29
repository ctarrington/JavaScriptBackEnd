"use strict";

function greet(name, cb) {
    setTimeout(function() {
        cb(null, 'hi, '+name+' '+Math.random());
    }, 1000);
}

module.exports = {
    greet: greet
};