module.exports = exports = function (server, options) {
  'use strict';
  exports.servers = exports.servers || {};
  options = options || {};

  var gutil = require('gulp-util'),
      path = require('path'),
      tinylr = require('tiny-lr'),
      Transform = require('stream').Transform,
      reload = new Transform({objectMode:true}),
      magenta = gutil.colors.magenta,
      defaultPort = 35729;

  if (typeof server === 'undefined') {
    server = defaultPort;
  }

  exports.middleware = tinylr.middleware;

  if (typeof server === 'number') {
    var port = server;
    if (exports.servers[port]) {
      server = exports.servers[port];
    } else {
      exports.servers[port] = server = tinylr(options);
      server.listen(port, function (err) {
        if (err) {
          throw new gutil.PluginError('gulp-livereload', err.message);
        }
        gutil.log('Live reload server listening on: ' + magenta(port));
      });
    }
  }

  reload.changed = function(filePath) {
    filePath = filePath.hasOwnProperty('path')? filePath.path : filePath;
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
