module.exports = function (server) {
  var es = require('event-stream');

  var changed = function (file, cb) {
    server.changed({
      body: {
        files: [file.path]
      }
    });

    cb(null, file);
  };

  return es.map(changed);
};
