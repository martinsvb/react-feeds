var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');

var assets = "./public/assets/";
var fonts = assets + "fonts";
var css = assets + "css";
var js = assets + "js";

// Copy font-awesome
gulp.task('fontAwesome', function() {
  return gulp.src([
    './node_modules/font-awesome/fonts/*'
  ])
  .pipe(gulp.dest(fonts));
});

// Process main.scss
gulp.task('sass', function () {
  return gulp.src(assets + 'scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(css));
});

// Build libraries
gulp.task('libs', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/moment/min/moment-with-locales.min.js',
    './node_modules/tether/dist/js/tether.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(js));
});

// Default task
gulp.task('default', function() {
  runSequence('fontAwesome',
              'sass',
              'libs'
  );  
});
