var gulp = require('gulp'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify');

gulp.task('process-scripts', function() {
	return gulp.src('src/js/**/**/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/scripts/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts/'))
});

gulp.task('default', function() {
	console.log("I have configured a gulpfile");
});