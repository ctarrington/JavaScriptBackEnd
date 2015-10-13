"use strict";

var request = require('superagent');
var Promise = require("bluebird");




function makeCall(id) {

    var start = Date.now();
    var stop = null;

    var promise = new Promise(function (resolve, reject) {
        request
            .get('http://localhost:3000/findMatches?q=^back.*[s]$')
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

function burst(size)
{
    var calls = [];

    var startBurst = Date.now();

    for (var ctr=0; ctr<size;ctr++)
    {
        var call = makeCall(ctr);
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

setInterval(function() { burst(50); }, 3500);
