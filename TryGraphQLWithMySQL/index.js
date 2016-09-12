var graphqlHTTP = require('express-graphql');
var express = require('express');

var db = require('./db');
var api = require('./api');


express()
  .use('/graphql', graphqlHTTP({ schema: api.schema, pretty: true, graphiql: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');