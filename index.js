'use strict';

var es = require('event-stream');
var tinylr = require('tiny-lr');
var relative = require('path').relative;
var _assign = require('lodash.assign');
var debug = require('debug')('gulp:livereload');
var options = { quiet: false };
var gutil = require('gulp-util');
var magenta = require('chalk').magenta;

/**
 * Create a stream for telling
 * the livereload server about changes
 *
 * @param {object|number} [opts]
 * @param [opts.port]     livereload server port
 * @param [opts.host]     livereload server host
 * @param [opts.basePath] base directory the path will be resolved to
 * @param [opts.start]    automatically start the server
 * @param [opts.quiet=false]
 */

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

/**
 * Start the livereload server
 *
 * @param {object|number} [opts]
 * @param [opts.port]     livereload server port
 * @param [opts.host]     livereload server host
 * @param [opts.basePath] base directory the path will be resolved to
 * @param [opts.start]    automatically start the server
 * @param [opts.quiet=false]
 */

exports.listen = function(opts) {
  if (exports.server) return;
  if (typeof opts === 'number') opts = { port: opts };
  options = _assign(options, opts);
  exports.server = new tinylr.Server(options);
  exports.server.listen(options.port, options.host, function() {
    debug('now listening on port %d', options.port);
  });
};

/**
 *
 * @param  {string|object} filePath
 */

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

  if (!options.quiet) {
    gutil.log(magenta(filePath) + ' reloaded.');
  }
};

/**
 * Invoke a page reload
 */
exports.reload = function() {
  exports.changed('index.html');
};

/**
 * Express middleware
 */

exports.middleware = tinylr.middleware;
