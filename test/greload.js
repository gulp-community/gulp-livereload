/*jshint strict:false, unused:false */
describe('gulp-livereload', function() {
  var gutil = require('gulp-util'),
      sinon = require('sinon'),
      greload = require('../'),
      tinylr = require('tiny-lr'),
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
  // it('throws an error if neither a livereload server nor a port number was passed', function() {
  //   should(function() {
  //     var reload = greload([]);
  //   }).throw('Please pass a port number or an instance of tiny-lr when calling gulp-livereload.');
  // });
});
