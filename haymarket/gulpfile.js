var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
    path = require('path'),
	minifyCss = require('gulp-clean-css');

var projectPaths = {
	scripts: ['./js/*.js'],
	less: './styles/less/*.less',
	css: './styles/css/'
};

gulp.task('less', function() {
  return gulp.src(projectPaths.less)
    .pipe(less({
    	paths: [path.join(projectPaths.less, 'less', 'includes')]
    }))
    .pipe(gulp.dest(projectPaths.css));
});

gulp.task('minify-css', function() {
  return gulp.src(projectPaths.css + 'main.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch(projectPaths.less, ['less']);
    gulp.watch(projectPaths.css + 'main.css', ['minify-css']);
    gulp.watch(projectPaths.scripts);
});
gulp.task('default', ['less', 'minify-css']);
