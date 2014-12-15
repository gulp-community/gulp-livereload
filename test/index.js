'use strict';

var gutil = require('gulp-util');
var es = require('event-stream');
var tinylr = require('tiny-lr');
var glr = require('../index.js');
var sinon = require('sinon');
var assert = require('assert');

var cwd = process.cwd();
var file = new gutil.File({
  base: cwd,
  cwd: cwd,
  path: cwd + '/style.css'
});
var srv;

describe('gulp-livereload', function() {
  beforeEach(function() {
    srv = sinon.stub(tinylr, 'Server');
  });
  afterEach(function() {
    ['basePath', 'key', 'cert', 'start'].forEach(function(key) {
      delete glr.options[key];
    });
    glr.server = null;
    srv.restore();
  });
  it('does not work', function(done) {
    var spy = sinon.spy();
    srv.returns({ changed: spy , listen: function() {}});
    es.readable(function(count, next) {
        this.emit('data', file);
        this.emit('end');
        next();
      })
      .pipe(glr({ basePath: cwd }))
      .on('end', function() {
        assert(spy.notCalled);
        done();
      });
  });
  it('works', function(done) {
    var spy = sinon.spy();
    srv.returns({ changed: spy , listen: function() {}});
    var lr = glr();
    glr.listen();
    es.readable(function(count, next) {
        this.emit('data', file);
        this.emit('end');
        next();
      })
      .pipe(lr)
      .on('end', function() {
        assert(spy.calledWith(files(file.path)));
        done();
      });
  });
  it('middleware', function() {
    assert(typeof glr.middleware === 'function');
  });
  it('non-standard port', function() {
    var spy = sinon.spy();
    srv.returns({ listen: spy });

    spy.reset();
    glr.server = null;
    glr.listen(2453);
    assert(spy.calledWith(2453));

    spy.reset();
    glr.server = null;
    glr.listen({ port: 9754 });
    assert(spy.calledWith(9754));
  });
  it('https', function() {
    var read = require('fs').readFileSync;
    var opts  = {
      key: read(__dirname + '/dev.key'),
      cert: read(__dirname + '/dev.pem')
    };
    srv.returns({ listen: function() {}});
    glr.listen(opts);
    assert(srv.calledWith(opts));
  });
  it('vinyl', function() {
    var spy = sinon.spy();
    srv.returns({ changed: spy, listen: function() {} });
    glr.listen();
    glr.changed(file);
    assert(spy.calledWith(files(file.path)));
  });
  it('option: basePath', function(done) {
    var spy = sinon.spy();
    srv.returns({ changed: spy , listen: function() {}});
    glr.listen();
    es.readable(function(count, next) {
        this.emit('data', file);
        this.emit('end');
        next();
      })
      .pipe(glr({ basePath: process.cwd() }))
      .on('end', function() {
        assert(spy.calledWith(files('style.css')));
        done();
      });
  });
  it('option: start', function(done) {
    var spy = sinon.spy();
    srv.returns({ changed: spy , listen: function() {}});
    es.readable(function(count, next) {
        this.emit('data', file);
        this.emit('end');
        next();
      })
      .pipe(glr({ start: true }))
      .on('end', function() {
        assert(spy.calledWith(files(file.path)));
        done();
      });
  });
});

function files(filePath) {
  return { body: { files: [ filePath ] } };
}
