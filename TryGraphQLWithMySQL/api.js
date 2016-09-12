const graphql = require('graphql');
const db = require('./db');

const addressType = new graphql.GraphQLObjectType({
  name: 'Address',
  fields: {
    id: { type: graphql.GraphQLID },
    line1: { type: graphql.GraphQLString, description: 'first line as in 1 Main Street' },
    line2: { type: graphql.GraphQLString },
    state: { type: graphql.GraphQLString },
    zipCode: {type: graphql.GraphQLInt}
  }
});

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLID },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString },
    addresses: {
      type: new graphql.GraphQLList(addressType),
      resolve(user) {
        return user.getAddresses();
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLID }
        },
        resolve: function (_, args) {
          return db.User.findOne({where: args});
        }
      },
      users: {
          type: new graphql.GraphQLList(userType),
          args: {
              firstName: {type: graphql.GraphQLString},
              lastName: {type: graphql.GraphQLString}
          },
          resolve: function(_, args) {
              return db.User.findAll({where: args}); 
          }

      }
    }
  })
});

module.exports = {schema};