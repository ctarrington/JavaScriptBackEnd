var jwt = require('jwt-simple');

var secretKey  = 'supersecretkey';

module.exports = function(app) {

  app.post('/login', function(req, res) {

    var payload = {username: req.body.name};
    var token = jwt.encode(payload, secretKey);
    console.log(token);

    res.send( {message: token} );
  });

};
