var graphql = require('graphql');
var db = require('./db');

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLID },
    firstName: { type: graphql.GraphQLString },
    lastName: { type: graphql.GraphQLString }
  }
});

var schema = new graphql.GraphQLSchema({
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