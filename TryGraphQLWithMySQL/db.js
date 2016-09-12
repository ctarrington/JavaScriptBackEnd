var Sequelize = require('sequelize');

var sequelize = new Sequelize('mysql://fred:fred@192.168.170.10:3306/trygraphql');

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING(50),
    field: 'first_name',
    allowNull: false,
    validate: {
        isAlpha: true 
    }
  },
  lastName: {
    type: Sequelize.STRING(50),
    field: 'last_name',
    allowNull: false,
    validate: {
        isAlpha: true 
    }
  },
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function createUsers() {
  User.create({firstName: 'John', lastName: 'Hancock'});
  User.create({firstName: 'Alexander', lastName: 'Hamilton'});
  User.create({firstName: 'Alexander', lastName: 'Thegreat'});
  User.create({firstName: 'Thomas', lastName: 'Jefferson'});
});

module.exports = {User};