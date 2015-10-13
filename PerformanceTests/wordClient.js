"use strict";

var request = require('superagent');
var Promise = require("bluebird");




function makeCall(id, letter) {

    var start = Date.now();
    var stop = null;

    var promise = new Promise(function (resolve, reject) {
        request
            .get('http://localhost:3000/findMatches?q=^'+letter+'.*'+letter+'$')
            .set('Accept', 'application/json')
            .end(function(err, res){

                stop = Date.now();

                if (err) { reject(err); return; }
                resolve(res);
            });
    });

    return {
        promise: promise,
        elapsed: function() { return stop-start; },
        id: id
    };
}

function pickSize()
{
    return 10*Math.random()+30;
}


var letters = ['a','b','c','d','e'];
function burst(size)
{
    var calls = [];

    var startBurst = Date.now();

    for (var ctr=0; ctr<size;ctr++)
    {
        var letterIndex = Math.floor(5*Math.random());
        var letter = letters[letterIndex];
        console.log('calling burst with '+letter);
        var call = makeCall(ctr,letter);
        calls.push(call);
    }

    var promises = calls.map(function(call) {return call.promise; });
    Promise.all(promises).then(function() {
        var elapsedTimes = calls.map(function(call) {return call.elapsed();});
        console.log('elapsedTimes = '+elapsedTimes.join(','));
        var elapsedBurst = Date.now()-startBurst;
        console.log('burst elapsed time = '+elapsedBurst);

    });

}

setInterval(function() { burst(pickSize()); }, 3500);
