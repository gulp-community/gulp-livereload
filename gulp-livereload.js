module.exports = function (server) {
  'use strict';

  var gutil = require('gulp-util'),
      path = require('path'),
      tinylr = require('tiny-lr'),
      Transform = require('stream').Transform,
      reload = new Transform({objectMode:true});

  if (!(server instanceof tinylr.Server)) {
    throw new gutil.PluginError(
      'gulp-livereload',
      'Please pass an instance of tiny-lr when calling gulp-livereload.'
    );
  }

  reload._transform = function(file, encoding, next) {
    var filename = gutil.colors.magenta(path.basename(file.path));
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
