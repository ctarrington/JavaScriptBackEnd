(function(){
  "use strict";

  var jwt = require('jwt-simple');
  var moment = require('moment');

  var secretKey  = 'supersecretkey';

  module.exports = function(app) {

    app.post('/token', function(req, res) {

      console.log(req);
      var payload = {sub: req.body.name, iss:'CandyStore', iat: moment().valueOf(), exp: moment().add(1, 'd').valueOf() };
      var token = jwt.encode(payload, secretKey);
      console.log(payload);

      res.send( {token: token} );
    });

  };

})();


