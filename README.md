gulp-livereload
===

[![Build Status][1]][2] [![Code Climate][7]][6] [![Livereload downloads][3]][4] [![Tag][9]][8] [![MIT Licensed][5]](#license)

[1]: http://img.shields.io/travis/vohof/gulp-livereload/master.svg?style=flat
[2]: https://travis-ci.org/vohof/gulp-livereload

[3]: http://img.shields.io/npm/dm/gulp-livereload.svg?style=flat
[4]: https://www.npmjs.com/package/gulp-livereload

[5]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat

[6]: https://codeclimate.com/github/vohof/gulp-livereload
[7]: https://img.shields.io/codeclimate/coverage/github/vohof/gulp-livereload.svg?style=flat

[8]: https://github.com/vohof/gulp-livereload/releases
[9]: https://img.shields.io/github/tag/vohof/gulp-livereload.svg?style=flat


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

Options
---

You can pass a few options to `gulp-livereload`:

* `port [number]`: livereload server port
* `host [string]`: livereload server host
* `basePath [string]`: will be prepend to file path
* `quiet [boolean]`: setting this to true will prevent gulp logs
* `start [boolean]`: automatically starts the server

Debugging
---

Set the `DEBUG` environment variables to `*` to see what's going on


```
$ DEBUG=* gulp <task>
```


License
---

The MIT License (MIT)

Copyright (c) 2014 Cyrus David

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
