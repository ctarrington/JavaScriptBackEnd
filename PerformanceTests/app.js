"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var fs = require('fs');

// returns the path to the word list which is separated by `\n`
var wordListPath = require('word-list');

app.use(express.static('client'));

var LIMIT = 10000;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

function busyWait(delay)
{
    var start = Date.now();
    var totalCtr = 0;
    var done = false;

    while (!done) {
        for (var ctr=0;ctr < 100000;ctr++)
        {
            totalCtr++;
        }
        var current = Date.now();
        var elapsed = current - start;
        done = (elapsed >= delay);
    }
}

function reverse(word)
{
    var reversed = '';

    var last = word.length-1;
    for (var ctr = last; ctr >= 0; ctr--)
    {
        reversed += word.substring(ctr, ctr+1);
    }

    return reversed;
}

function compareLength(wm1, wm2) {
    if (wm1.word.length > wm2.word.length) {
        return -1;
    }
    if (wm1.word.length < wm2.word.length) {
        return 1;
    }

    return 0;
}

function wrapWord(word) {
    return {word: word, length: word.length, upper: word.toUpperCase()};
}

function findLongest(wm, currentLong) {
    return (wm.word.length > currentLong.word.length) ? wm : currentLong;
}

function filterPalindromes(wm) {
    return (wm.word === reverse(wm.word));
}

function buildResponse(wordList, req) {

    var start = Date.now();

    var re = new RegExp(req.query.q, 'i');

    function matcher(wrapped) {
        return (wrapped.word.match(re));
    }

    var wrappedWords = wordList.map(wrapWord);

    var matches = wrappedWords.filter(matcher);

    var palindromes = matches.filter(filterPalindromes);
    var longestPalindrome = (palindromes.length > 0) ? palindromes.reduce(findLongest) : null;

    var response = {
        query: req.query.q,
        longest: matches.reduce(findLongest),
        length: matches.length,
        lost: 0,
        longestPalindrome: longestPalindrome,
        palindromes: palindromes,
        matches: matches.sort(compareLength)
    };


    if (matches.length > LIMIT) {
        response.lost = response.matches.length - LIMIT;
        response.matches = response.matches.slice(0, LIMIT);
        response.length = response.matches.length;
    }

    var elapsed = Date.now() - start;
    console.log('elapsed='+elapsed);
    return response;
}

var server = app.listen(3000, function () {

    var wordList = null;

    app.get('/findMatches', function(req, res) {

        if (!wordList)
        {
            // read 2.8M of words
            fs.readFile(wordListPath, 'utf8', function(err, data) {

                if (err) {
                    res.status(500).send({error: err});
                    return;
                }

                wordList = data.split('\n');

                res.send(buildResponse(wordList, req));
            });
        }
        else
        {
            res.send(buildResponse(wordList, req));
        }


    });


    console.log('Performance Tests listening at http://%s:%s', server.address().address, server.address().port);
});