gulp-livereload
===

[![Build Status](http://img.shields.io/travis/vohof/gulp-livereload/master.svg?style=flat)](https://travis-ci.org/vohof/gulp-livereload) ![Livereload downloads ](http://img.shields.io/npm/dm/gulp-livereload.svg?style=flat) [![MIT Licensed](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](#license)

A lightweight [gulp](https://github.com/gulpjs/gulp) plugin for livereload best used with the [livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).

Install
---

```
npm install --save-dev gulp-livereload
```

Usage
---

#### Starting v3.x, `gulp-livereload` will not automatically listening for changes. You'd have to manually call `livereload.listen`.

```javascript
var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload');

gulp.task('less', function() {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/*.less', ['less']);
});
```

See [examples](examples).

License
---

The MIT License (MIT)

Copyright (c) 2014 Cyrus David

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
