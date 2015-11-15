var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	watch = require('gulp-watch'),
	minifyCss = require('gulp-minify-css');

var paths = {
	scripts: ['./js/*.js'],
	stylus: './styles/styl/*.styl',
	css: './styles/css/style.css'
};


gulp.task('stylus', function () {
    gulp.src(paths.stylus)
        .pipe(stylus())
        .pipe(gulp.dest('./styles/css'));
});

gulp.task('minify-css', function() {
  return gulp.src(paths.css)
    .pipe(minifyCss())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(paths.stylus, ['stylus']);
    gulp.watch(paths.css, ['minify-css']);
    gulp.watch(paths.scripts);
});
gulp.task('default', ['stylus', 'minify-css', 'watch']);
