(function() {
  "use strict";

  function foo()
  {
    return (Math.random() > 0.5) ? 'hi1' : undefined;
  }

  module.exports = {
    foo: foo
  };

})();
