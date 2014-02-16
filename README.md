gulp-livereload
===

[![Build Status](https://travis-ci.org/vohof/gulp-livereload.png?branch=master)](https://travis-ci.org/vohof/gulp-livereload) ![gulp-livereload latest](http://img.shields.io/npm/v/gulp-livereload.svg) [ ![Dependency Status](https://david-dm.org/vohof/gulp-livereload.png)](https://david-dm.org/vohof/gulp-livereload)

A [gulp](https://github.com/gulpjs/gulp) plugin for livereload best used with the [livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).

Install
---

```
npm install --save-dev gulp-livereload
```

### livereload([param])


#### param
Type: `Number` or `tinylr.Server` <br>

Port number livereload will listen to or an instance of a `tiny-lr` server. If none is passed, a livereload server is automatically created listening to the default port `35729`.

Returns a `Transform` stream

Sample Usages
---

`gulp-livereload` can be passed into a stream:

```javascript
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(watch())
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});
```

or make use of `gulp.watch`

```javascript
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('build/css'));
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch('build/**').on('change', function(file) {
      server.changed(file.path);
  });
});
```

### Example usage with static server

```javascript
var livereload = require('gulp-livereload'),
    dest = 'build';

gulp.task('staticsvr', function(next) {
  var staticS = require('node-static'),
      server = new staticS.Server('./' + dest),
      port = 80;
  require('http').createServer(function (request, response) {
    request.addListener('end', function () {
      server.serve(request, response);
    }).resume();
  }).listen(port, function() {
    gutil.log('Server listening on port: ' + gutil.colors.magenta(port));
    next();
  });
});

gulp.task('watch', ['staticsvr'], function() {
  var server = livereload();
  gulp.watch(dest + '/**').on('change', function(file) {
      server.changed(file.path);
  });
});
```

License
---

The MIT License (MIT)

Copyright (c) 2013 Cyrus David

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
