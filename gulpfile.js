/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	jshint = require('gulp-jshint'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');


gulp.task('start', function () {
  connect.server({
    name: 'Gulp Demo App',
    root: 'dist',
    port: 8001,
    livereload: true
  });
});

gulp.task('process-scripts', function() {
	return gulp.src('src/app/**/**/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/scripts/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts/'))
	
});

gulp.task('process-styles', function() {
	return gulp.src('src/css/*.css')
	.pipe(gulp.dest('dist/css/'))
    .pipe(livereload())
});

gulp.task('process-libs', function(){
	return gulp.src('src/bower_components/**')
	.pipe(gulp.dest('dist/bower_components/'))
});

gulp.task('process-html', function(){
	return gulp.src('src/**/**/*.html')
	.pipe(gulp.dest('dist/'))
    .pipe(livereload())
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('src/app/**/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(livereload())
});

gulp.task('build', ['watch', 'start', 'process-scripts', 'process-styles', 'process-libs', 'process-html'], function(){
	console.log("Build successfull.");
});

// configure which files to watch and what tasks to use on file changes
gulp.task("watch", function(){
	gulp.watch('src/app/**/**/*.js', ['process-scripts']);

	gulp.watch('src/**/**/*.html', ['process-html']);

	gulp.watch('src/css/*.css', ['process-styles']);
});


// define the default task and add the watch task to it
gulp.task('default', ["build"], function() {
	console.log("I have configured a gulpfile");
});