module.exports = function (server) {
  'use strict';

  var gutil = require('gulp-util'),
      path = require('path'),
      Transform = require('stream').Transform,
      reload = new Transform({objectMode:true});

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
