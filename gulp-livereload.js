module.exports = exports = function (server) {
  'use strict';
  exports.servers = exports.servers || {};

  var gutil = require('gulp-util'),
      path = require('path'),
      tinylr = require('tiny-lr-fork'),
      Transform = require('stream').Transform,
      reload = new Transform({objectMode:true}),
      magenta = gutil.colors.magenta,
      defaultPort = 35729;

  if (typeof server === 'undefined') {
    server = defaultPort;
  }

  if (typeof server === 'number') {
    var port = server;
    if (exports.servers[port]) {
      server = exports.servers[port];
    } else {
      exports.servers[port] = server = tinylr();
      server.listen(port, function (err) {
        if (err) {
          throw new gutil.PluginError('gulp-livereload', err.message);
        }
        gutil.log('Live reload server listening on: ' + magenta(port));
      });
    }
  }

  reload.changed = function(filePath) {
    if(process.env.NODE_DEBUG && process.env.NODE_DEBUG.match(/livereload/)) {
      gutil.log(magenta(path.basename(filePath)) + ' was reloaded.');
    }

    server.changed({
      body: {
        files: [filePath]
      }
    });
  };

  reload._transform = function(file, encoding, next) {
    reload.changed(file.path);
    this.push(file);
    next();
  };

  return reload;
};
