const graphqlHTTP = require('express-graphql');
const express = require('express');

const db = require('./db');
const api = require('./api');


express()
  .use('/graphql', graphqlHTTP({ schema: api.schema, rootValue: api.rootValue, pretty: true, graphiql: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');