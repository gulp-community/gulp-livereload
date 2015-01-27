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

3.x Upgrade Notice
---

`gulp-livereload` will not automatically listen for changes. You now have to manually call `livereload.listen` or enable auto start.
More details below...

API & Variables
---

livereload uses a config object throughout its methods and while you never have to
use this, it is useful if you want to set configuration directly only once.

    livereload.options.port                     Server port
    livereload.options.host                     Server host
    livereload.options.basePath                 Path to prepend all given paths
    livereload.options.start                    Automatically start
    livereload.options.quiet        false       Disable console logging
    livereload.options.reloadPage   index.html  Path to the page the browsers on for a full page reload

livereload also reveals the underlying server instance for direct access if needed. The instance
is a "tiny-lr" instance that this wraps around. If the server is not running then this will be undefined.

    livereload.server

You can also directly access the middleware of the underlying server instance (tiny-lr.middleware) for
hookup through express, connect, or some other middleware app

    livereload.middleware

To start livereload up and running, use this command. It takes an optional options parameter that is the
same as the global one noted above. If none is present is uses the above one. Also you dont need to worry with multiple instances as
this function will end immidiately if the server is already runing. 

    livereload.listen(options)

You can manually, yourself, send a change notification of a single file to the browser causing the browser to reload that change.
All it requires is a single file path. Do also note that the basePath is not forgotten about and will be applied to the path if 
provided or previosuly setup.

You may provide a simple string or an object, if an object is given it expects a property called "path" to be present on it

    livereload.change(path)

You can also tell the browser to refresh the entire page, including all the assets on the page as opposed to individual assets.
This works best for single-page apps but can work on any setup. Essentially you need to refresh the page the browser is currently on.
With single-apge apps its just one page, if not then it must be the current page in the browser.

However it's setup, this assumes the page is called "index.html", you can change it by providing an optional new path to use as a
string or change it globally with the options object exposed and mentioned above.

The base path is not forgotten about and will also be applied if setup

    livereload.reload(path)

Finally theres the Gulp pipe stream function, the most important function, which automatically sends the destination file through
`livereload.change`

    livereload(options)

Example
---

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
