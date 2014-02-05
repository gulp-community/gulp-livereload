module.exports = exports = function (server) {
  'use strict';
  exports.servers = exports.servers || {};

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

  // if (!(server instanceof tinylr.Server)) {
  //   throw new gutil.PluginError(
  //     'gulp-livereload',
  //     'Please pass a port number or an instance of tiny-lr when calling gulp-livereload.'
  //   );
  // }

  reload._transform = function(file, encoding, next) {
    var filename = magenta(path.basename(file.path));
    gutil.log(filename + ' was reloaded.');
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
