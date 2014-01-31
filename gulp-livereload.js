module.exports = function (server) {
  'use strict';

  var Transform = require('stream').Transform,
      reload = new Transform({objectMode:true});

  reload._transform = function(file, encoding, next) {
    server.changed({
      body: {
        files: [file.path]
      }
    });
    this.push(file);
    next();
  };

  return reload;
};
