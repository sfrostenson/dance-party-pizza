var gulp = require('gulp');

// Run this to compress all the things!
gulp.task('build', ['views', 'minifyCss', 'uglifyJs']);
