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
      server,
      spy;
  beforeEach(function() {
    server = tinylr();
    spy = sinon.spy(server, 'changed');
  });
  it('reloads file passing a livereload server instance', function(done) {
    var reload = greload(server);
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
  it('throws an error if an livereload server was not passed... for now', function() {
    should(function() {
      var reload = greload();
    }).throw('Please pass an instance of tiny-lr when calling gulp-livereload.');
  });
});
