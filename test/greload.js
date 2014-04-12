/*jshint strict:false, unused:false */
describe('gulp-livereload', function() {
  var gutil = require('gulp-util'),
      sinon = require('sinon'),
      greload = require('../'),
      tinylr = require('tiny-lr-fork'),
      should = require('should'),
      file = new gutil.File({
      path: '/foo/bar.css'
    }),
      server;
  beforeEach(function() {
    server = tinylr();
  });
  it('reloads file passing a livereload server instance', function(done) {
    var reload = greload(server);
    var spy = sinon.spy(server, 'changed');
    reload.end(file);
    reload.on('data', function(file) {
      should(spy.calledWith({
        body: {
          files: [file.path]
        }
      })).ok;
      done();
    });
  });
  it('reloads file passing a port number', function(done) {
    var port = 35730;
    var reload = greload(port);
    var spy = sinon.spy(greload.servers[port], 'changed');
    reload.end(file);
    reload.on('data', function(file) {
      should(spy.calledWith({
        body: {
          files: [file.path]
        }
      })).ok;
      done();
    });
  });
  it('reloads file using default port if given no parameter at all', function(done) {
    var reload = greload();
    var port = 35729;
    var spy = sinon.spy(greload.servers[port], 'changed');
    reload.end(file);
    reload.on('data', function(file) {
      should(spy.calledWith({
        body: {
          files: [file.path]
        }
      })).ok;
      done();
    });
  });
  it('exposes .changed()', function() {
    var port = 35728;
    var reload = greload(port);
    var spy = sinon.spy(greload.servers[port], 'changed');
    reload.changed('foo/bar.txt');
    should(spy.calledWith({
      body: {
        files: ['foo/bar.txt']
      }
    })).ok;
  });
  it('displays debug messages', function() {
    var gutil = require('gulp-util');
    var port = 35727;
    var reload = greload(port);
    var spy = sinon.spy(gutil, 'log');

    reload.changed('foo/bazbar.txt');
    spy.calledWith(gutil.colors.magenta('bazbar.txt') + ' was reloaded.').should.not.be.ok;

    process.env.NODE_DEBUG = 'livereload';
    reload.changed('foo/bazbar.txt');
    spy.calledWith(gutil.colors.magenta('bazbar.txt') + ' was reloaded.').should.be.ok;
  });
});
