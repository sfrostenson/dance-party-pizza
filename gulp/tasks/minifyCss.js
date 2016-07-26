var gulp = require('gulp');
var config    = require('../config').build;
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');
var rename    = require('gulp-rename');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest(config.dest + '/css'))
    .pipe(size());
});
