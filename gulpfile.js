/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	beautify = require('gulp-beautify'),
    gls = require('gulp-live-server'),
    open = require('gulp-open');



var server = gls.static('dist', 8001);

gulp.task('start', function(){
    server.start();
    var options = {
       uri: 'http://localhost:8001/index.html',
       app: 'chrome'
    };
    gulp.src(__filename)
    .pipe(open(options));
});
  

gulp.task('process-scripts', function() {
	return gulp.src('src/app/**/**/*.js')
	.pipe(concat('main.js'))
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('dist/scripts/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts/'))
	
});

gulp.task('process-styles', function() {
	return gulp.src('src/css/*.css')
	.pipe(gulp.dest('dist/css/'))
   
});

gulp.task('process-libs', function(){
	return gulp.src('src/bower_components/**')
	.pipe(gulp.dest('dist/bower_components/'))
});

gulp.task('process-html', function(){
	return gulp.src('src/**/**/*.html')
	.pipe(gulp.dest('dist/'))
    
});

// configure which files to watch and what tasks to use on file changes
gulp.task("watch", function(){
    gulp.watch('src/app/**/**/*.js', ['process-scripts']);

    gulp.watch('src/**/**/*.html', ['process-html']);

    gulp.watch('src/css/*.css', ['process-styles']);
});

gulp.task('build', ['process-scripts', 'process-styles', 'process-libs', 'process-html'], function(){
	console.log("Build successfull.");
});


// define the default task and add the watch task to it
gulp.task('default', ["build"], function() {
	console.log("I have configured a gulpfile");
});