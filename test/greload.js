/*jshint strict:false, unused:false, expr:true, maxlen:999 */
describe('gulp-livereload', function() {
  var gutil = require('gulp-util'),
      sinon = require('sinon'),
      greload = require('..'),
      tinylr = require('tiny-lr'),
      should = require('should'),
      pem = require('pem'),
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
    process.env.NODE_DEBUG = null;
  });
  it('exposes tiny-lr middleware', function() {
    (typeof greload.middleware).should.eql('function');
  });
  describe('.changed', function() {
    it('works', function() {
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
    it('works', function() {
      var port = 35726;
      var reload = greload(port);
      var spy = sinon.spy(greload.servers[port], 'changed');
      reload.changed(file);
      should(spy.calledWith({
        body: {
          files: ['/foo/bar.css']
        }
      })).ok;
    });
  });
  it('works on https', function(done) {
    pem.createCertificate({days:1, selfSigned:true}, function (err, keys) {
      var port = 35725;
      var fs = require('fs');
      var https = require('https');
      var spy = sinon.spy(https, 'createServer');
      var reload = greload(port, {
        key: keys.serviceKey,
        cert: keys.certificate
      });
      spy.calledOnce.should.ok;
      spy.restore();
      done();
    });
  });
});
