module.exports = function (server) {
  var map = require('map-stream');

  var changed = function (file, cb) {
    server.changed({
      body: {
        files: [file.path]
      }
    });

    cb(null, file);
  };

  return map(changed);
};
