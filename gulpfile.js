var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');

var assets = "./public/assets/";
var fonts = assets + "fonts";
var css = assets + "css";
var js = assets + "js";

// Copy font-awesome
gulp.task('fonts', function() {
  return gulp.src([
    './node_modules/font-awesome/fonts/*',
    './node_modules/summernote/dist/font/*'
  ])
  .pipe(gulp.dest(fonts));
});

// Process main.scss
gulp.task('sass', function () {
  return gulp.src(assets + 'scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(css));
});

// Minify main.css
gulp.task('minCss', function () {
  
  gulp.src([
    './node_modules/summernote/dist/summernote.css'
  ])
  .pipe(replace('url("font', 'url("../assets/fonts'))
  .pipe(gulp.dest(css));
  
  gulp.src([
    css + '/main.css',
    css + '/summernote.css'
  ])
  .pipe(concat('main.css'))
  .pipe(gulp.dest(css));

  return gulp.src(css + '/main.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest(css));
});

// Default task
gulp.task('css', function() {
  runSequence('sass',
              'minCss'
  );  
});

// Build libraries
gulp.task('libs', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/moment/min/moment-with-locales.min.js',
    './node_modules/tether/dist/js/tether.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/summernote/dist/summernote.min.js',
    './node_modules/summernote/dist/lang/summernote-cs-CZ.min.js',
    './node_modules/summernote/dist/lang/summernote-sk-SK.min.js',
    './node_modules/summernote/dist/lang/summernote-hu-HU.min.js',
    './node_modules/summernote/dist/lang/summernote-pl-PL.min.js'
  ])
  .pipe(concat('libs.js'))
  .pipe(gulp.dest(js));
});

// Default task
gulp.task('default', function() {
  runSequence('libs',
              'fonts',
              'css'
  );  
});
