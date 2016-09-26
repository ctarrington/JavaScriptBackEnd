const { buildSchema } = require('graphql');
const db = require('./db');

var schema = buildSchema(`

  type Address {
    id: ID
    line1: String
    line2: String
    state: String
    zipCode: Int
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    addresses: [Address]
  }

  type Query {
    hi: String
    users: [User]
  }

`);

var rootValue = {
  hi: () => { 
    console.log('resolve hi');
    return 'yo yo'; 
  },
  users: () => {
    console.log('resolve users');
    return db.User.findAll({include: [db.Address]});
  }

}

module.exports = {schema, rootValue};