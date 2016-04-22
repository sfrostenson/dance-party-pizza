// var changed    = require('gulp-changed');
var gulp       = require('gulp');
var config     = require('../config').assets;
var browserSync  = require('browser-sync');
var handleErrors = require('../util/handleErrors');

gulp.task('assets', function() {
  return gulp.src(config.src)
    // .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});