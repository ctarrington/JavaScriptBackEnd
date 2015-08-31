(function() {
  "use strict";

  var jwt = require('jwt-simple');
  var moment = require('moment');

  var secretKey = 'supersecretkey';

  module.exports = function() {
    return function checkjwt(req, res, next) {

      if (req.path.indexOf('/api') === 0) {
        var raw = req.headers['authorization'];
        var payload = (raw) ? jwt.decode(raw.substr(7), secretKey) : null;  // raw = 'Bearer <token>'

        if (!payload) {
          res.status(403).end();
        }
      }

      next();
    }
  };

})();
