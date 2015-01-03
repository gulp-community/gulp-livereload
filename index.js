'use strict';

var es = require('event-stream');
var tinylr = require('tiny-lr');
var relative = require('path').relative;
var _assign = require('lodash.assign');
var debug = require('debug')('gulp:livereload');
var options = { port: 35729, host: 'localhost' };

module.exports = exports = function(opts) {
  options = _assign(options, opts);

  var glr = es.map(function(file, done) {
    var filePath = file.path;
    exports.changed(filePath);
    done(null, file);
  });

  if (options.start) exports.listen(options);

  return glr;
};

exports.options = options;

exports.listen = function(opts) {
  if (exports.server) return;
  if (typeof opts === 'number') opts = { port: opts };
  options = _assign(options, opts);
  exports.server = new tinylr.Server(options);
  exports.server.listen(options.port, options.host, function() {
    debug('now listening on port %d', options.port);
  });
};

exports.changed = function (filePath) {
  if (!exports.server) {
    debug('no server listening, nothing notified.');
    return;
  }
  if (typeof filePath === 'object') {
    filePath = filePath.path;
  }
  if (options.basePath) {
    filePath = '/' + relative(options.basePath, filePath);
  }
  exports.server.changed({ body: { files: [ filePath ] } });
};

exports.middleware = tinylr.middleware;
