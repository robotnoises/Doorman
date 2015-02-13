var gulp = require('gulp');

// Paths in this development environment
var path = {
  source: './src/**/*.js',
  build: './dist/',
  // config: './config/*.js',
  docs: './docs/'
}

////////////////////////////////////////////////////////////////////////////////
// Build minified & non-minified
////////////////////////////////////////////////////////////////////////////////

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('build', function() {
  return gulp.src(path.source)
    .pipe(concat('detective.js'))
    // This will output the non-minified version
    .pipe(gulp.dest(path.build))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(path.build));
});
