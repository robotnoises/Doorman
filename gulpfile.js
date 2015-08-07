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
    './src/utils.js',
    // Main module
    './src/doorman.js',
    // Modules for main methods
    './src/redirect.js',
    './src/browserTest.js',
    './src/check.js'
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
// Validate code using JSHint
////////////////////////////////////////////////////////////////////////////////

// cli:
//
// gulp hint (runs jslint on all in src/)
// gulp hint --file <fileName> (runs jslint on all in src/fileName.js)
// gulp hint --file <fileName.js> (runs jslint on all in src/fileName.js)

var jshint = require('gulp-jshint');

gulp.task('hint', function() {
  var fileName = yargs.argv['file'] || '*';
  if (fileName.indexOf('.js') === -1) fileName = fileName + '.js';

  return gulp.src('./src/' + fileName)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
