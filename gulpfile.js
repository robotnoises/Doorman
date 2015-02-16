var gulp = require('gulp');
var yargs = require('yargs');

// Paths in this development environment
var path = {
  source: './src/**/*.js',
  build: './dist/',
  docs: './docs/'
}

////////////////////////////////////////////////////////////////////////////////
// Build minified & non-minified source
////////////////////////////////////////////////////////////////////////////////

// cli: gulp build

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src([
    './src/tools.js',
    './src/browserTests.js',
    './src/check.js',
    './src/redirect.js',
    './src/doorman.js'
  ])
    .pipe(concat('doorman.js'))
    // This will output the non-minified version
    .pipe(gulp.dest(path.build))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(path.build));
});

////////////////////////////////////////////////////////////////////////////////
// Validate code using Doug Crockford's JSHint
////////////////////////////////////////////////////////////////////////////////

// cli:
//
// gulp lint (runs jslint on all in src/)
// gulp lint --file <fileName> (runs jslint on all in src/fileName.js)
// gulp lint --file <fileName.js> (runs jslint on all in src/fileName.js)

var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  var fileName = yargs.argv['file'] || '*';
  if (fileName.indexOf('.js') === -1) fileName = fileName + '.js';

  return gulp.src('./src/' + fileName)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
