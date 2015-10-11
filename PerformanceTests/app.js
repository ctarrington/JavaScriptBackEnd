"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');

var wordList = fs.readFileSync(wordListPath, 'utf8').split('\n');
//=> [..., 'abmhos', 'abnegate', ...]

app.use(express.static('client'));

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

var server = app.listen(3000, function () {

    app.post('/createLargeFile', function(req, res) {

        res.send({messge:'hi', words: wordList.slice(0, 20), length: wordList.length});

    });

    app.get('/readLargeFile', function(req, res) {

        res.send({messge:'hi'});

    });

    app.get('/wordLengthHistogramForFile', function(req, res) {

        res.send({messge:'hi'});

    });

    app.get('/findMatches', function(req, res) {

        var re = new RegExp(req.query.q, 'i');
        var LIMIT = 10000;

        function matcher(word)
        {
            return (word.match(re));
        }

        var matches = wordList.filter(matcher);
        var wrappedMatches = matches.map(function wrap(word) {
           return {match: word, length: word.length, upper: word.toUpperCase()};
        });

        var longest = wrappedMatches.reduce(function findLongest(wm, currentLong) {
            return (wm.match.length > currentLong.match.length) ? wm : currentLong;
        });

        var response = {};
        response.query = req.query.q;
        response.longest = longest;
        response.length = wrappedMatches.length;
        response.lost = 0;
        response.wrappedMatches = wrappedMatches;

        if (response.wrappedMatches.length > LIMIT) {
            response.lost = response.wrappedMatches.length - LIMIT;
            response.wrappedMatches = response.wrappedMatches.slice(0, LIMIT);
            response.length = response.wrappedMatches.length;
        }



        res.send(response);

    });



    console.log('Performance Tests listening at http://%s:%s', server.address().address, server.address().port);
});