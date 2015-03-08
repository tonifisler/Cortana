var gulp = require('gulp'),
    gutil = require('gulp-util'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    shell = require('gulp-shell'),
    stylish = require('jshint-stylish');

// SASS compile, autoprefix and minify task
gulp.task('styles', function() {
  return gulp.src('assets/sass/main.scss')
    .pipe(sass())
    .on('error', gutil.beep)
    .on('error', notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(minifycss())
    .pipe(gulp.dest('theme-build/css'));
});

// CSS vendors concat and minify
gulp.task('css_vendors', function() {
  gulp.src([
    ])
    .pipe(concat('vendors.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('theme-build/css'))
});

// JS task
gulp.task('scripts', function() {
  gulp.src('assets/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('theme-build/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('theme-build/js'));
});

// JS vendors concat and minify
gulp.task('js_vendors', function() {
  gulp.src([
      'vendors/jquery/jquery.js'
    ])
    .pipe(concat('vendors.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('theme-build/js'));
});

gulp.task('default', ['watch', 'js_vendors', 'css_vendors', 'styles', 'scripts']);

gulp.task('watch', function() {
  gulp.watch('assets/sass/*.scss', ['styles']);
  gulp.watch('assets/js/*.js', ['scripts']);
});