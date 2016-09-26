const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://apiuser:apiuser@localhost:15432/graphqldb');

const User = sequelize.define('user', {
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
  freezeTableName: true 
});

const Address = sequelize.define('address', {
    line1: {
      type: Sequelize.STRING(50),
      allowNull: false,
      validate: {
        is: ["^[a-z0-9 ]+$",'i'],
      }
    },
    line2: {
      type: Sequelize.STRING(50),
      allowNull: true,
      validate: {
        is: ["^[a-z0-9 ]+$",'i'], 
      }
    },
    state: {
      type: Sequelize.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: true 
      }
    },
    zipCode: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true 
      }
    }
}, {
  freezeTableName: true 
});

User.hasMany(Address);
Address.belongsTo(User);

sequelize.sync({force: true}).then(function createUsers() {
User.create({firstName: 'John', lastName: 'Hancock'});
User.create({firstName: 'Alexander', lastName: 'Hamilton'});
User.create({firstName: 'Alexander', lastName: 'Thegreat'});
User.create({firstName: 'Thomas', lastName: 'Jefferson'}).then(user => {
    user.createAddress({line1: '1 Main Street',
                        state: 'MD',
                        zipCode: 12345});
    });
});


module.exports = {User};