gulp-livereload
===

quick gulp plugin I made for livereload

You should use this with the [livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

Install
---

```
npm install --save gulp-livereload tiny-lr
```

Sample Usage
---

```javascript
var lr = require('tiny-lr'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    server = lr();

gulp.task('less', function () {
  gulp.src('less/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'))
    .pipe(livereload(server));
});

gulp.task('watch', function () {
  server.listen(35729, function (err) {
    if (err) return console.log(err);

    gulp.watch('less/*.less', function () {
        gulp.run('less');
    });
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
